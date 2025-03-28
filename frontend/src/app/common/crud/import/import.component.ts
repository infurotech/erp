import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrudField } from '../crud-field';
import { CrudOptions } from '../crud-options';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { AppConsts } from 'src/app/shared/AppConsts';

@Component({
    selector: 'crud-import',
    templateUrl: './import.component.html',
    styleUrl: './import.component.scss',
})
export class ImportComponent implements OnInit {
  @ViewChild('importDialog') importDialog: DynamicDialogRef | undefined;
  @ViewChild('fileUploader') fileUploader:FileUpload;

  @Input() fields: Array<CrudField> = []; // Field definitions
  @Input() data: any[] = [];

  @Output() onImport: EventEmitter<any> = new EventEmitter();

  uploadUrl : string = AppConsts.fileUploadUrl;
  displayImportDialog: boolean;
  parsedFileData = [];
  mappedTableData = [];
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
  errorColumns: any[] = [];

  constructor(private fb: FormBuilder,private messageService: MessageService) {
    this.items = [
      {
          label: 'Upload'
      },
      {
          label: 'Mapping'
      },
      {
          label: 'Validate'
      }
  ];

  }
  ngOnInit(): void {
    this.mappingForm = this.fb.group({
      mappings: this.fb.array([]) 
    });
  }

  openDialog() {
    this.importDialog.maximize({});
    this.displayImportDialog = true;
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  navigateBack() {
    this.activeIndex--;
  }

  navigateForward() {
    if(this.activeIndex == 1) {
      this.confirmMapping();
      return;
    }
    this.activeIndex++;
  }

   async onDocumentUpload(event: any) {
    this.files = event.files;
    if (this.files && this.files.length) {
      const file = this.files[0];
      await this.parseExcel(file).then((res : any) => {
         if(res) {
            this.initializeMappingForm();
            this.activeIndex = 1;
         }
         else {
          this.messageService.add({ severity:'error', detail: res });
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
        this.parsedFileData = jsonData;
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
    const mappedData = this.parsedFileData.map((row,rowIndex) => {
      const mappedRow: any = {};
      for (const field of this.fields) {
        const uploadedHeader = mappedHeaders[field.field];
        mappedRow[field.field] = row[uploadedHeader];
          !mappedRow[field.field] && field.required && this.errorColumns.push({'row': rowIndex,'field': field.field});
      }
      return mappedRow;
    });

    this.mappedTableData = mappedData;
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
    this.displayImportDialog = false;
    this.uploadedHeaders = [];
    this.mappedTableData = []
    this.activeIndex = 0;
    this.errorColumns = [];
  }

  updateTableData(row: number , field: any) {
    const exists = this.errorColumns.some(
      (error) => error.row === row && error.field === field
    );
    
    if(this.mappedTableData[row][field]) {
       exists && this.errorColumns.splice(
        this.errorColumns.findIndex(
          (error) => error.row === row && error.field === field
        ),1
       );
    } else {
      console.warn("error")
       this.errorColumns.push({'row' : row,'field': field})
    }
  }

  submitForm() {
      let isValid = this.validateImportedData();

      if(!isValid && this.mappedTableData.length > 0) {
         this.messageService.add({ severity:'success', detail: 'Data Imported' });
         this.onImport.emit(this.mappedTableData);
      } else {
        this.messageService.add({ severity:'error', detail: 'Invalid Data' });
      }
  }

  validateImportedData(): boolean {
    return this.errorColumns.length > 0;
  }

  downloadImportTemplate() {
    const templateFormat = this.generateTemplateFormat(this.fields);

    const blob = new Blob([templateFormat], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'import.csv';
    link.click();
  }

  generateTemplateFormat(fields: Array<CrudField>): string {
    const headers = fields.map(field => field.label).join(',');
    return headers;
  }

  uploadDocument() {
    this.errorColumns = [];
    this.fileUploader.choose();
  }
}
