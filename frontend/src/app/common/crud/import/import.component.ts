import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrudField } from '../crud-field';
import { CrudOptions } from '../crud-options';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'crud-import',
    templateUrl: './import.component.html',
    styleUrl: './import.component.scss',
})
export class ImportComponent implements OnInit {
  @Input() fields: Array<CrudField> = []; // Field definitions
  @Input() data: any[] = [];
  @Output() eventActionImport: EventEmitter<any> = new EventEmitter();

  showData = [];
  showTableData = [];
  files: any[] = [];
  uploadedHeaders = [];
  crudOptions: CrudOptions = {
    gridEditing: false,
    boardView: false,
    fields: []
  };
  items: MenuItem[];
  activeIndex: number = 0;

  mappingForm: FormGroup;
  gridForm: FormGroup;

  constructor(private fb: FormBuilder,private messageService: MessageService) {
    this.items = [
      {
          label: 'Upload File'
      },
      {
          label: 'Data Mapping'
      },
      {
          label: 'Display'
      }
  ];

  }
  ngOnInit(): void {
    this.mappingForm = this.fb.group({
      mappings: this.fb.array([]) 
    });

    this.gridForm = this.fb.group({
      gridRows: this.fb.array([])
    });
  }

  getGridRows() {
    return (this.gridForm.get('gridRows') as FormArray);
  }

  getRowData(field: CrudField,i: number) {
    return (this.getGridRows()?.controls?.[i] as FormGroup)?.controls[field.field]?.value;
  }

  setGridFormData() {
    this.showTableData.forEach((item) => {
      const row = this.fb.group({});
      this.fields.forEach(field => {
        row.addControl(field.field, this.fb.control(item[field.field] || '', field.required ? Validators.required : []));
      });
      this.getGridRows().push(row);
    });
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  navigateBack() {
    this.activeIndex--;
  }

  navigateForward() {
    if(this.activeIndex == 0 && this.files.length) {
      this.activeIndex++;
    }
    else if(this.activeIndex == 1) {
      this.confirmMapping();
    }
    else if(this.activeIndex == 2) {
      this.submitForm();
    }
  }

   async onDocumentUpload(event: any) {
    this.files = event.files;
    if (this.files && this.files.length) {
      const file = this.files[0];
      await this.parseExcel(file).then((res) => {
         if(res) {
            this.initializeMappingForm();
            this.activeIndex = 1;
         }
         else {
          console.log("error",res)
         }
      })
    }
  }

  parseExcel(file: File) {
     return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
  
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
  
        const jsonData = XLSX.utils.sheet_to_json(sheet);
  
        const fields: CrudField[] = this.mapFields(jsonData);
        this.crudOptions.fields = fields;
        this.uploadedHeaders = Object.keys(jsonData[0]);
        this.showData = jsonData;
        resolve(true)
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
     })
  }

  initializeMappingForm(): void {
    const mappingsFormArray = this.mappingForm.get('mappings') as FormArray;
    mappingsFormArray.clear();
    this.fields.forEach(header => {
      mappingsFormArray.push(
        this.fb.group({
          requiredHeader: [header.field],
          mappedField: [ this.searchFieldValue(header.field), header.required ? Validators.required : null]
        })
      );
    });
  }

  searchFieldValue(value: string):string {
    return this.uploadedHeaders.find(ele => {
        if(value.toLowerCase() == ele.toLowerCase()) {
          return ele;
        }
    });
  }

  // Method to confirm the header mappings
  confirmMapping(): void {
    if(this.mappingForm.invalid) return;

    const mappings = this.mappingForm.value.mappings;
    const mappedHeaders: { [key: string]: string } = {};

    mappings.forEach((mapping: { requiredHeader: string; mappedField: string }) => {
      if (mapping.mappedField) {
        mappedHeaders[mapping.requiredHeader] = mapping.mappedField;
      }
    });

    this.mapDataToFields(mappedHeaders);
    this.activeIndex = 2;
  }

  // Method to map the data to the selected fields
  mapDataToFields(mappedHeaders: { [key: string]: string }): void {
    const mappedData = this.showData.map(row => {
      const mappedRow: any = {};
      for (const field of this.fields) {
        const uploadedHeader = mappedHeaders[field.field];
        mappedRow[field.field] = row[uploadedHeader];
      }
      return mappedRow;
    });

    this.showTableData = mappedData;
    this.setGridFormData();
  }

  mapFields(jsonData: any[]): CrudField[] {
    const fields: CrudField[] = [];

    if (jsonData && jsonData.length > 0) {
      const columnNames = Object.keys(jsonData[0]); 

      columnNames.forEach((column: string) => {
        const field: CrudField = {
          field: column,
          label: column,
          type: this.getFieldType(jsonData, column)
        };

        fields.push(field);
      });
    }

    return fields;
  }


  getFieldType(data: any[], column: string): 'text' | 'number' | 'select' | 'date' | 'tag' {
    const firstRow = data[0];
    const firstValue = firstRow[column];

    if (typeof firstValue === 'number') {
      return 'number';
    } else if (Date.parse(firstValue)) {
      return 'date';
    } else if (Array.isArray(firstValue)) {
      return 'select';
    } else {
      return 'text';
    }
  }

  resetForm(): void {
    this.uploadedHeaders = [];
    this.showTableData = []
    this.activeIndex = 0;
  }

  submitForm() {
      let isValid = this.validateImportedData();
      
      this.showTableData = this.getGridRows().controls.map((rowControl: FormGroup) => {
        const rowData = {};
        this.fields.forEach(field => {
          rowData[field.field] = rowControl.get(field.field)?.value;
        });
        return rowData;
      });

      if(!isValid && this.showTableData.length > 0) {
         this.eventActionImport.emit(this.showTableData);
         this.messageService.add({ severity:'success', detail: 'Data Imported' });
      } else {
        this.messageService.add({ severity:'error', detail: 'Invalid Data' });
      }
  }

  validateImportedData(): boolean {
    return this.gridForm.invalid;
  }
}
