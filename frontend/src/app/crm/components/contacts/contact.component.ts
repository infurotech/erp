import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'crm-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.less'
})
export class ContactComponent implements OnInit{
  fieldOptions = {};
  crudOptions:  CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields:[
      { field: 'id', label: 'ID', type: 'number', required: true, key: true },
      { field: 'firstName', label: 'First Name', type: 'text', filter:true,required: true },
      { field: 'lastName', label: 'Last Name', type: 'text',required: true },
      { field: 'email', label: 'Email', type: 'tag', filter:true,required: true,
      //    options:[
      //   { label: 'ashish@infuro.com', value: 'ashish@infuro.com' },
      //   { label: 'sakshi@infuro.com', value: 'sakshi@infuro.com' },
      //   { label: 'sag@bestwe.com', value: 'sag@bestwe.com' }
      // ]
     },
      { field: 'phone', label: 'Phone', type: 'custom', filter: true, required: true },
      // { field: 'company', label: 'Company', type: 'tag', filter: true,  required: true, options:[
      //   { label: 'Infuro', value: 'Infuro' },
      //   { label: 'BestWe', value: 'BestWe'}
      // ] },
      // { field: 'status', label: 'Status', type: 'tag', filter: true, options: [
      //   { label: 'Unqualified', value: 'unqualified', severity: 'danger' },
      //   { label: 'Qualified', value: 'qualified', severity: 'success' },
      //   { label: 'New', value: 'new', severity: 'info' },
      //   { label: 'Negotiation', value: 'negotiation', severity: 'warning' },
      //   { label: 'Renewal', value: 'renewal', severity: '' },
      //   { label: 'Proposal', value: 'proposal', severity: 'info' }
      // ]}
    ]
  }
  selectedUser:string = '';
  @Output() contactsChange = new EventEmitter<any[]>();
  contacts:any = [];
  fieldOption: any[];
  constructor( private _httpClient: HttpClient
  ) {
      
  }

   ngOnInit() {
    this.fieldOption = this.crudOptions.fields;

    this._httpClient.get(
      '/api/customers'
    ).subscribe({
      next: (result) => {
        this.contacts = result;
      }, error: (err) => {
        console.log("errorInBulkGet", err);
      }
    })
    
    this._httpClient.get(
      `/api/customers/list?columns=firstName,lastName,email,phone`
    ).subscribe({
      next: (result : any) => {
        this.fieldOptions = result;
      },error: (err) => {
        console.log("errorInListGet",err);
      }
    })
  }
  
  // contacts:any = []
  //  [
  //   { id: 1, firstName: 'Ashish Gupta', email: 'ashish@infuro.com', phone: '+91 999999999', company: 'Infuro', status: 'unqualified', date: '2023-01-01' },
  //   { id: 2, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 888888888', company: 'Infuro', status: 'qualified', date: '2023-02-15' },
  //   { id: 3, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 777777777', company: 'Infuro', status: 'qualified', date: '2023-03-20' },
  //   { id: 4, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 666666666', company: 'Infuro', status: 'proposal', date: '2023-04-10' },
  //   { id: 5, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 555555555', company: 'Infuro', status: 'renewal', date: '2023-05-05' },
  //   { id: 6, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 444444444', company: 'Infuro', status: 'renewal', date: '2023-06-18' },
  //   { id: 7, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 333333333', company: 'Infuro', status: 'new', date: '2023-07-22' },
  //   { id: 8, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 222222222', company: 'Infuro', status: 'new', date: '2023-08-30' },
  //   { id: 9, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 111111111', company: 'Infuro', status: 'qualified', date: '2023-09-12' },
  //   { id: 10, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 000000000', company: 'Infuro', status: 'qualified', date: '2023-10-25' },
  //   { id: 11, firstName: 'Sakshi Garg', email: 'sakshi@infuro.com', phone: '+91 9876543210', company: 'Infuro', status: 'new', date: '2023-11-08' },
  //   { id: 11, firstName: 'Sag', email: 'sag@bestwe.com', phone: '+91 9876543210', company: 'BestWe', status: 'new', date: '2024-12-06' }
  // ];

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
    let indexArray = actionData.map(data => data.index);
    this._httpClient.delete(
      '/api/customers/multiple',
       {body : {indexes: indexArray}}
    ).subscribe({
      next: (result) => {
        console.log("customer deleted",result);
      },error: (err) => {
        console.log("errorIndeletion",err);
      }
    })
  }

  onFilterChange(event){
  }

  onClear() {
    this.selectedUser = null;
  }

  getBulkImport(event) {

    let data = { "bulk" :  event.data }
    
    this._httpClient.post(
      '/api/customers/bulk',
      data
    ).subscribe({
      next: (result) => {
        console.log("Result",result);
      },error: (err) => {
        console.log("errorInBulk",err);
      }
    })
  }

  onDataUpdated(event) {
    const apiUrl = `/api/customers/`;
    if(event.action == 'create') {
      this._httpClient.post(
        apiUrl,
        event.item
      ).subscribe({
        next: (result) => {
          console.log("customer created",result);
        },error: (err) => {
          console.log("errorInCreation",err);
        }
      })
    } else {
      this._httpClient.put(
        apiUrl + event.index,
        event.item
      ).subscribe({
        next: (result) => {
          console.log("customer updated",result);
        },error: (err) => {
          console.log("errorInUpdation",err);
        }
      })
    }
  }
}
