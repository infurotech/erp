import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudOptions } from 'src/app/common/crud/crud-options';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent implements OnInit {
  users: string[] = [];
  leads: [] = [];
  crudOptions: CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields: [
      { field: 'id', label: 'Lead ID', type: 'text', required: true, key: true },
      { field: 'contact_company', label: 'Contact', type: 'tag', filter: true, required: true },
      { field: 'status', label: 'Status', type: 'tag', filter: true, options: [
        { label: 'New', value: 'New', severity: 'info' },
        { label: 'Contacted', value: 'Contacted', severity: 'warning' },
        { label: 'Qualified', value: 'Qualified', severity: 'success' },
        { label: 'Proposal', value: 'Proposal', severity: 'info' },
        { label: 'Negotiation', value: 'Negotiation', severity: 'warning' },
        { label: 'Closed', value: 'Closed', severity: 'danger' }
      ]},
      { field: 'type', label: 'Lead Type', type: 'tag', filter: true, required: true, options: [
        { label: 'Product Inquiry', value: 'Product Inquiry' },
        { label: 'Service Request', value: 'Service Request' },
        { label: 'Partnership', value: 'Partnership' },
        { label: 'Investment', value: 'Investment' }
      ]},
      { field: 'amount', label: 'Estimated Value', type: 'number', filter: true, required: false },
      { field: 'expected_close_date', label: 'Expected Close Date', type: 'date', filter: true, required: false },
      { field: 'assigned_to', label: 'Assigned To', type: 'tag', filter: true, required: false }
    ]
  }

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

  onFilterChange(event) {
  }

  onClear() {
  }

  getBulkImport(event) {
  }
}

