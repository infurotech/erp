import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrudField } from '../crud-field';
import { CrudOptions } from '../crud-options';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'crud-import',
    templateUrl: './import.component.html',
    styleUrl: './import.component.scss',
})
export class ImportComponent implements OnInit {
  @Input() fields: Array<CrudField> = []; // Field definitions
  @Input() data: any[] = [];
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  showData = [];
  showTableData = [];
  showGrid = false;
  files: any[] = [];
  uploadedHeaders = [];
  isDialogVisible: boolean;
  crudOptions: CrudOptions = {
    gridEditing: false,
    boardView: false,
    fields: []
  };

  mappingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.mappingForm = this.fb.group({
      mappings: this.fb.array([]) 
    });
  }
  ngOnInit(): void {}

  // Method to open the dialog
  openDialog(): void {
      this.isDialogVisible = true;
      this.files = [];
  }

   async onDocumentUpload(event: any) {
    this.files = event.files;
    if (this.files && this.files.length) {
      const file = this.files[0];
      await this.parseExcel(file).then((res) => {
         if(res) {
            this.initializeMappingForm();
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
          mappedField: [null, header.required ? Validators.required : null]
        })
      );
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
    this.showGrid = true;
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
    this.showGrid = false;
    this.uploadedHeaders = [];
    this.showTableData = []
    this.isDialogVisible = false;
  }

  submitForm() {
      if(this.showTableData.length > 0) {
         this.notifyParent.emit("File uploaded successfully");
      }
  }
}