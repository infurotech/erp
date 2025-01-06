import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { CustomerService } from '../../services/customer.service';
import { MessageService } from 'primeng/api';
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
     },
      { field: 'phone', label: 'Phone', type: 'custom', filter: true, required: true },
    ]
  }
  selectedUser:string = '';
  @Output() contactsChange = new EventEmitter<any[]>();
  contacts:any = [];
  fieldOption: any[];

  constructor(private customerService: CustomerService,private messageService: MessageService
  ) {
      
  }

   ngOnInit() {
    this.fieldOption = this.crudOptions.fields;

   this.customerService.getCustomers().subscribe((result) => this.contacts = result);

    let fields = "firstName,email,phone";
    this.customerService.getFieldsData(fields).subscribe({
      next: (result : any) => {
        this.fieldOptions = result;
      },error: (err) => {
        this.messageService.add({ severity:'error', detail:"Error In Getting List" });
      }
    })
  }

  onAction(event: any): void {
    if(event.action == 'create') {
      this.customerService.createCustomer(event.item).subscribe({
        next: (result) => {
          this.contacts.push(event.item);
          this.messageService.add({ severity:'success', detail:"customer created" });
        },error: (err) => {
          this.messageService.add({ severity:'error', detail:"error In Creation" });
        }
      })
    } else if(event.action == 'update') {
      this.customerService.updateCustomer(event.item, event.updatedItem['index']).subscribe({
        next: (result) => {
          const index = this.contacts.findIndex(item => item === event.updatedItem);
          if (index !== -1) {
            this.contacts[index] = event.item;
          }
          this.messageService.add({ severity:'success', detail:"customer updated" });
        },error: (err) => {
          this.messageService.add({ severity:'error', detail:"error In Updation" });
        }
      })
    } else {
      let indexArray = event.item.map(data => data.index);
      this.customerService.deleteCustomer(indexArray).subscribe({
        next: (result) => {
          this.contacts = this.contacts.filter(item => !event.item.some(selected => selected === item));
          this.messageService.add({ severity:'success', detail:"customers deleted" });
        },error: (err) => {
          this.messageService.add({ severity:'error', detail:"error In Deletion" });
        }
      })
    }
  }

  onFilterChange(event){
    if(event.isClear) {
      this.selectedUser = null;
    }
  }

  getBulkImport(event) {
    let data = { "bulk" :  event.data }
    
    this.customerService.createBulkCustomers(data).subscribe({
      next: (result) => {
        this.messageService.add({ severity:'success', detail: 'Data Imported' });
      },error: (err) => {
        this.messageService.add({ severity:'success', detail: 'Error In Import' });
      }
    })
  }
}
