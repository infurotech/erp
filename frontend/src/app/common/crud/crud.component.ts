import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
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
  @Output() onAction = new EventEmitter<any[]>();
  @Output() onFilterChange = new EventEmitter<any[]>();
  @Output() onClear = new EventEmitter<any[]>();
  @ContentChild('filterTemplate', { static: false }) filterTemplate!: TemplateRef<any>;

  selectedRows: any[] = [];
  initialData: T[] = [];  
  fields: CrudField[] = []; 
  @Output() onBulkImport: EventEmitter<any> = new EventEmitter();

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
  contactsList: string[] = [];
  showMoreFilters: boolean;
  initialFilteredFields: CrudField[];
  // for add new fiter
  showFilterDialog: boolean = false;
  isNewFilterAdded: boolean = false;
  newFilterName: string = '';
  customFilters: any[] = []; 
  filteredData: any[] = [];
  // tabMenuItems: any[] = [];
  tabMenuItems: MenuItem[] = [];  
  activeItem: any = null;

  activeFilters = {
    name: '',
    email: '',
    company: '',
    status: '',
    search: ''
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }
 

 
  ngOnInit(): void {
    this.filteredFields = this.options.fields.filter(field => !field.key && field.filter === true).slice(0, 2);  
    // this.moreFilters = this.options.fields.filter(field => !field.key && field.filter === true).slice(2); 
    this.initializeForm();
    this.initialFilteredFields = [...this.filteredFields];
    // this.initialData = [...this.data]
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

    // As of now we don't have any api so getting contacts data via loop. 
    // this.data.forEach(item => {
    //    this.contactsList.push(item['phone'])
    // })
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
    
    Object.keys(this.activeFilters).forEach(field => {
      if (this.activeFilters[field]) {
        filteredData = filteredData.filter(item => {
          let fieldValue = item[field];
          return Array.isArray(this.activeFilters[field])
                  ? this.activeFilters[field].includes(fieldValue)
                  : fieldValue === this.activeFilters[field]
        });
      }
    });
  
    // Store the filtered data to use later
    this.data = filteredData;
    this.filteredData = filteredData;
    this.onFilterChange.emit(filteredData);
  }
  
  resetFilter() {
    const previousFilteredData = [...this.filteredData];
    this.searchKeyword = '';  
    this.filters = {};
    this.activeFilters = {
      name: '',
      email: '',
      company: '',
      status: '',
      search: ''
    };
    this.onClear.emit();
    this.onFilter();
    this.initialFilteredFields = [...this.filteredFields];    
    this.filteredData = previousFilteredData;
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

  onFilterChangeEvent(event:any) {
    const { field, value, header } = event;
    
    if (field === 'search') {
      this.searchKeyword = value
    } else {
      this.activeFilters[header] = value;
    }

    this.onFilter();
  }

  saveFilter() {
    this.showFilterDialog = true;
  }
  
  onCreateCustomFilter() {
    if (this.newFilterName) {
      const newFilter = {
        name: this.newFilterName,
        filteredData: [...this.filteredData] 
      };
      this.customFilters.push(newFilter);
      const newTab: MenuItem = {
        label: this.newFilterName,
        command: () => this.onTabClick(newFilter)  
      };

      this.tabMenuItems = [...this.tabMenuItems, newTab];
      this.activeItem = this.tabMenuItems[this.tabMenuItems.length - 1]; 
  
      this.newFilterName = '';  
      this.showFilterDialog = false;
    }
  }
  
  onTabClick(filter: any) {
    this.filteredData = filter.filteredData;
    this.data = [...this.filteredData];  
  }
  
  onImport(event: any) {
    this.data = this.data.concat(event);
    this.onBulkImport.emit({type: 'Bulk' , data: event});
  }

}
