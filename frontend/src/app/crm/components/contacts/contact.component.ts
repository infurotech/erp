import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudField } from '../../../common/crud/crud-field';
import { CustomerService } from '../../services/customer.service';
import { CrudOptions } from 'src/app/common/crud/crud-options';

@Component({
  selector: 'crm-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.less'
})
export class ContactComponent implements OnInit{
  users : string[] = [];
  contacts: [] = [];
  crudOptions:  CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields: [
      { field: 'id', label: 'ID', type: 'text', required: false, key: true },
      { field: 'first_name', label: 'First Name', type: 'text', filter: true, required: true },
      { field: 'last_name', label: 'Last Name', type: 'text', filter: true, required: true },
      { field: 'full_name', label: 'Full Name', type: 'text', filter: true, required: false },
      { field: 'email', label: 'Email', type: 'text', filter: true, required: true },
      { field: 'phone', label: 'Phone', type: 'text', filter: true, required: false },
      { field: 'mobile', label: 'Mobile', type: 'text', filter: true, required: false },
      { field: 'company', label: 'Company', type: 'tag', filter: true, required: false, options: [] }, // Populate dynamically
      { field: 'job_title', label: 'Job Title', type: 'text', filter: true, required: false },
      { field: 'lead_status', label: 'Lead Status', type: 'tag', filter: true, required: true, options: [
        { label: 'New', value: 'new', severity: 'info' },
        { label: 'Contacted', value: 'contacted', severity: 'warning' },
        { label: 'Qualified', value: 'qualified', severity: 'success' },
        { label: 'Converted', value: 'converted', severity: 'success' },
        { label: 'Lost', value: 'lost', severity: 'danger' }
      ]},
      { field: 'relationship_status', label: 'Relationship', type: 'tag', filter: true, required: false, options: [
        { label: 'Prospect', value: 'prospect', severity: 'info' },
        { label: 'Customer', value: 'customer', severity: 'success' },
        { label: 'Partner', value: 'partner', severity: 'primary' },
        { label: 'Supplier', value: 'supplier', severity: 'warning' }
      ]},
      { field: 'assigned_to', label: 'Assigned To', type: 'tag', filter: true, required: false, options: [] }, // Populate dynamically
      { field: 'created_at', label: 'Created At', type: 'date', required: false },
      { field: 'updated_at', label: 'Updated At', type: 'date', required: false }
    ]
  }
  selectedUser:string = '';
  @Output() contactsChange = new EventEmitter<any[]>();

  fieldOption: any[];
  constructor(
  ) {
  }

  ngOnInit() {
    this.fieldOption = this.crudOptions.fields;
  }

  onAction(actionData: any): void {
  }

  onFilterChange(event){
  }

  onClear() {
    this.selectedUser = null;
  }

  getBulkImport(event) {
  }
}
