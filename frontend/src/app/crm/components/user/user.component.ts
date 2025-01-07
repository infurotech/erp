import { Component, OnInit } from '@angular/core';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { CustomerService } from '../../services/customer.service';
import { ComponentsProvider } from 'src/app/shared/component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.less'
})
export class UserComponent implements OnInit{
  crudOptions:  CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields:[
      { field: 'id', label: 'ID', type: 'number', required: true, key: true },
      { field: 'firstName', label: 'First Name', type: 'text', filter:true,required: true },
      { field: 'middleName', label: 'Middle Name', type: 'text',required: true},
      { field: 'lastName', label: 'Last Name', type: 'text',required: true },
      { field: 'email', label: 'Email', type: 'tag', filter: true, required: true },
    ]
  }
  users:any = [];
  fieldOptions = {};

  constructor(private customerService: CustomerService, private component: ComponentsProvider) {
    this.customerService.setEndPoint('/api/users')
  }

  ngOnInit() {
     this.customerService.getCustomers().subscribe(res => {
      this.users = res;
     })

    let fields = "firstName,email,lastName";
    this.customerService.getFieldsData(fields).subscribe({
      next: (result : any) => {
        this.fieldOptions = result;
      },error: (err) => {
        this.component.showToast("Error In Getting List" , 'error');
      }
    })
  }

  onAction(event: any): void {
    if(event.action == 'create') {
      this.customerService.createCustomer(event.item).subscribe({
        next: (result) => {
          this.users.push(event.item);
          this.component.showToast("user created" , 'success');
        },error: (err) => {
          this.component.showToast("error In Creation" , 'error');
        }
      })
    } else if(event.action == 'update') {
      this.customerService.updateCustomer(event.item, event.updatedItem['id']).subscribe({
        next: (result) => {
          const index = this.users.findIndex(item => item === event.updatedItem);
          if (index !== -1) {
            this.users[index] = event.item;
          }
          this.component.showToast("user updated" , 'success');
        },error: (err) => {
          this.component.showToast("error In Updation" , 'error');
        }
      })
    } else {
      let indexArray = event.item.map(data => data.id);
      this.customerService.deleteCustomer(indexArray).subscribe({
        next: (result) => {
          this.users = this.users.filter(item => !event.item.some(selected => selected === item));
          this.component.showToast("user deleted" , 'success');
        },error: (err) => {
          this.component.showToast("error In Deletion" , 'error');
        }
      })
    }
  }

  getBulkImport(event) {
    let data = { "bulk" :  event.data }
    
    this.customerService.createBulkCustomers(data).subscribe({
      next: (result) => {
        this.component.showToast("Data Imported" , 'success');
      },error: (err) => {
        this.component.showToast("error In Import" , 'error');
      }
    })
  }

}
