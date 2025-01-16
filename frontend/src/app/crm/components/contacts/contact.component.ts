import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { CustomerService } from '../../services/customer.service';
import { ComponentsProvider } from 'src/app/shared/component';
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
  adminList = [];

  constructor(private customerService: CustomerService,private component: ComponentsProvider
  ) {
      this.customerService.setEndPoint('/api/customers');
      this.customerService.getVehicles().subscribe((result) => console.log("resultVehicles",result));
      this.customerService.getCustomerById(52).subscribe((result) => console.log("CustomerById",result));
  }

   ngOnInit() {
   this.customerService.getCustomers().subscribe((result) => this.contacts = result['customers']);

    let fields = "firstName,email,phone";
    this.customerService.getFieldsData(fields).subscribe({
      next: (result : any) => {
        this.fieldOptions = result;
      },error: (err) => {
        this.component.showToast("Error In Getting List" , 'error');
      }
    })

    this.customerService.getAdminNameList("firstName").subscribe(res => {
       this.adminList = res['firstName'];
    })
  }

  onAction(event: any): void {
    if(event.action == 'create') {
      this.customerService.createCustomer(event.item).subscribe({
        next: (result) => {
          this.contacts.push(event.item);
          this.component.showToast("customer created" , 'success');
        },error: (err) => {
          this.component.showToast("error In Creation" , 'error');
        }
      })
    } else if(event.action == 'update') {
      this.customerService.updateCustomer(event.item, event.updatedItem['id']).subscribe({
        next: (result) => {
          const index = this.contacts.findIndex(item => item === event.updatedItem);
          if (index !== -1) {
            this.contacts[index] = event.item;
          }
          this.component.showToast("customer updated" , 'success');
        },error: (err) => {
          this.component.showToast("error In Updation" , 'error');
        }
      })
    } else {
      let indexArray = event.item.map(data => data.id);
      this.customerService.deleteCustomer(indexArray).subscribe({
        next: (result) => {
          this.contacts = this.contacts.filter(item => !event.item.some(selected => selected === item));
          this.component.showToast("customer deleted" , 'success');
        },error: (err) => {
          this.component.showToast("error In Deletion" , 'error');
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
        this.component.showToast("Data Imported" , 'success');
      },error: (err) => {
        this.component.showToast("Error In Import" , 'error');
      }
    })
  }
}
