import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudField } from './crud-field';
import { MenuItem } from 'primeng/api';
import { CrudOptions } from './crud-options';
import { ImportComponent } from './import/import.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.less'
})
export class CrudComponent<T extends Record<string, any>> implements OnInit {
  @ViewChild(ImportComponent) importComponent: ImportComponent;

  @Input() displayName: string;
  @Input() options: CrudOptions;  // Field definitions
  @Input() data: T[] = [];           // List of items
  @Input() filteredFields: Array<CrudField> = [];  // Field definitions


  form: FormGroup;
  isEditing: boolean = false;
  editingItem: T | null = null;
  isDialogVisible: boolean = false;
  editTableColumns: boolean = false;
  gridView: boolean = true;
  moreActionItems: MenuItem[] | undefined;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.filteredFields = this.options.fields.filter(f => !f.key);
    this.moreActionItems = [
      {
        label: 'Export',
        icon: 'pi pi-file-export',
      },
      {
        label: 'Import',
        icon: 'pi pi-file-import',
        command: () => {
          this.importComponent.openDialog();
        }
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
    return validators;
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
    this.initializeForm();  // Reinitialize the form when opening the dialog
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

    this.resetForm();
  }

  // Add new item to the list
  addItem(): void {
    const newItem = this.form.value;
    this.data.push(newItem);
    console.log('Item added:', newItem);
  }

  // Update an existing item
  updateItem(): void {
    const updatedItem = this.form.value;
    const index = this.data.findIndex(item => item === this.editingItem);
    if (index !== -1) {
      this.data[index] = updatedItem;
      console.log('Item updated:', updatedItem);
    }
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
      console.log('Item deleted:', item);
    }
  }

  // Reset the form and editing state
  resetForm(): void {
    this.form.reset();
    this.isDialogVisible = false;
  }

  // Getter for easy access to form controls in the template
  get f() { return this.form.controls; }

  getNotification(event: any) {
    console.log("import event",event)
  }

}
