import { Component, OnInit } from '@angular/core';
import { CrudField } from '../../../common/crud/crud-field';
import { CustomerService } from '../../services/customer.service';
import { CrudOptions } from 'src/app/common/crud/crud-options';

@Component({
  selector: 'crm-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.less'
})
export class ContactComponent implements OnInit{
  
  crudOptions:  CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields:[
      { field: 'id', label: 'ID', type: 'number', required: true, key: true },
      { field: 'name', label: 'Name', type: 'text', required: true },
      { field: 'email', label: 'Email', type: 'text', required: true },
      { field: 'phone', label: 'Phone', type: 'custom', filter: true, required: true },
      { field: 'company', label: 'Company', type: 'text', filter: true,  required: true },
      { field: 'status', label: 'Status', type: 'tag', filter: true, options: [
        { label: 'Unqualified', value: 'unqualified', severity: 'danger' },
        { label: 'Qualified', value: 'qualified', severity: 'success' },
        { label: 'New', value: 'new', severity: 'info' },
        { label: 'Negotiation', value: 'negotiation', severity: 'warning' },
        { label: 'Renewal', value: 'renewal', severity: '' },
        { label: 'Proposal', value: 'proposal', severity: 'info' }
      ]}
    ]
  }

  constructor(
    private _customerService: CustomerService
  ) {
      
  }

  ngOnInit(): void {
  }

  contacts = [
    { id: 1, name: 'Ashish Gupta', email: 'ashish@infuro.com', phone: '+91 999999999', company: 'Infuro', status: 'unqualified' },
    { id: 2, name: 'Rudresh Sharma', email: 'Rudresh@infuro.com', phone: '+91 888888888', company: 'Infuro', status: 'qualified' },
    { id: 3, name: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 777777777', company: 'Infuro', status: 'qualified' },
    { id: 4, name: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 666666666', company: 'Infuro', status: 'proposal' },
    { id: 5, name: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 555555555', company: 'Infuro', status: 'renewal' },
    { id: 6, name: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 444444444', company: 'Infuro', status: 'renewal' },
    { id: 7, name: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 333333333', company: 'Infuro', status: 'new' },
    { id: 8, name: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 222222222', company: 'Infuro', status: 'new' },
    { id: 9, name: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 111111111', company: 'Infuro', status: 'qualified' },
    { id: 10, name: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 000000000', company: 'Infuro', status: 'qualified' },
    { id: 11, name: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 9876543210', company: 'Infuro', status: 'new' },
  ];

  representatives = [
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
  ];

  onAction(actionData: any): void {
    console.log('Received form data ----->', actionData);
  }

  onFilterChange(event){
    console.log("Filtered Data ----->",event);
  }
}
