import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudField } from './crud-field';
import { MenuItem } from 'primeng/api';
import { CrudOptions } from './crud-options';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.less'
})
export class CrudComponent<T extends Record<string, any>> implements OnInit {

  @Input() displayName: string;
  @Input() options: CrudOptions;  // Field definitions
  @Input() data: T[] = [];           // List of items
  @Input() filteredFields: Array<CrudField> = [];  // Field definitions
  @Output() onAction = new EventEmitter<any[]>();
  @Output() onFilterChange = new EventEmitter<any[]>();
  selectedRows: any[] = [];
  initialData: T[] = [];  
  fields: CrudField[] = []; 
  form: FormGroup;
  isEditing: boolean = false;
  editingItem: T | null = null;
  isDialogVisible: boolean = false;
  editTableColumns: boolean = false;
  gridView: boolean = true;
  isDeleteButtonVisible: boolean = false;
  moreActionItems: MenuItem[] | undefined;
  searchKeyword: string = '';
  filters: Record<string, any> = {};
  confirmDeleteDialog: boolean = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initialData = [...this.data]
    this.filteredFields = this.options.fields.filter(f => !f.key);
    this.moreActionItems = [
      {
        label: 'Export',
        icon: 'pi pi-file-export',
      },
      {
        label: 'Import',
        icon: 'pi pi-file-import',
      }
    ]
  }

 // Initialize the form based on fields configuration
initializeForm(): void {
  const group: Record<string, any> = {};

  this.options.fields.forEach(field => {
    const validators = this.getValidators(field);
    group[field.field] = [this.editingItem?.[field.field] || '', validators];
  });

  this.form = this.fb.group(group); 
}

  // Helper function to return validators
  getValidators(field: any): any[] {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }
    if (field.field === 'name') {
      validators.push(Validators.pattern('^[a-zA-Z0-9_]*$'));
    }
    if (field.field === 'email') {
      validators.push(Validators.email);  
    }
  
    return validators;
  }
  openDialogEvent(event: { isEdit: boolean, item: any }) {
    this.openDialog(event.isEdit, event.item);
  }
  // Open Dialog for Add or Edit
  openDialog(isEdit: boolean, item?: T): void {
    if (isEdit && item) {
      this.editingItem = item;
      this.isEditing = true;
    } else {
      this.isEditing = false;
      this.editingItem = null;
    }
    this.initializeForm(); 
    this.isDialogVisible = true;  // Show the dialog
  }

  // Submit handler for both adding and editing
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.isEditing) {
      this.updateItem();
    } else {
      this.addItem();
    }
    this.onAction.emit(this.form.value);
  }

  // Add new item to the list
  addItem(): void {
    const newItem = this.form.value;
    this.data.push(newItem);
    this.isDialogVisible = false;
  }

  // Update an existing item
  updateItem(): void {
    const updatedItem = this.form.value;
    const index = this.data.findIndex(item => item === this.editingItem);
    if (index !== -1) {
      this.data[index] = updatedItem;
    }
    this.isDialogVisible = false;
  }

  // Start editing an item
  editItem(item: T): void {
    this.editingItem = item;
    this.isEditing = true;
    this.initializeForm();
  }

  // Delete an item
  deleteItem(item: T): void {
    const index = this.data.findIndex(i => i === item);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  // Reset the form and editing state
  resetForm(): void {
    this.isDialogVisible = false;
  }

  // Getter for easy access to form controls in the template
  get f() { return this.form.controls; }

  // Handle selection change event from child component
  onSelectionChange(selectedRows: any[]) {
    this.selectedRows = selectedRows;
    this.isDeleteButtonVisible = selectedRows.length > 0;
  }

  onDelete() {
    this.confirmDeleteDialog = true;
  }

  confirmDelete(event) {
    if (this.selectedRows.length > 0) {
      this.onAction.emit(this.selectedRows);
      this.data = this.data.filter(item => !this.selectedRows.some(selected => selected === item));
      this.selectedRows = [];
      this.isDeleteButtonVisible = false;
      this.confirmDeleteDialog = false;
  
    } else if (event) {
      if (Array.isArray(event)) {
        this.selectedRows = event;
      } else {
        this.selectedRows = [event];
      }
      this.onAction.emit(this.selectedRows);
      this.data = this.data.filter(item => !this.selectedRows.some(selected => selected === item));
      this.selectedRows = [];
      this.isDeleteButtonVisible = false;
      this.confirmDeleteDialog = false;
    } else {
      alert('No items selected for deletion');
    }
  }
  
  onFilter() {
    let filteredData = [...this.initialData]; 
    if (this.searchKeyword) {
      filteredData = filteredData.filter(item => {
        return Object.values(item).some(val =>
          val?.toString().toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
      });
    }
  
    Object.keys(this.filters).forEach(field => {
      if (this.filters[field]) {
        filteredData = filteredData.filter(item => {
          const fieldValue = item[field];
          if (fieldValue instanceof Date && this.filters[field] instanceof Date) {
            return fieldValue.toISOString().slice(0, 10) === this.filters[field].toISOString().slice(0, 10);
          }
          return fieldValue === this.filters[field];
        });
      }
    });

    this.data = filteredData;
    this.onFilterChange.emit(filteredData)
  }
  
  onResetFilter() {
    this.searchKeyword = '';  
    this.filteredFields.forEach(field => {
      this.filters[field.field] = null;
    });
    this.data = [...this.initialData];
    this.onFilter();
  }

  createFormFields() {
    this.fields.forEach(field => {
      this.form.addControl(field.field, this.fb.control('')); 
    });
  }

  onTableHeadersReceived(fields: CrudField[]) {
    this.fields = fields;   
    this.createFormFields();  
  }
  
}
