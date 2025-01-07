import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengImportsModule } from '../common/primeng/primeng-import.module';
import { CrudModule } from '../common/crud/crud.module';
import { CRMRoutingModule } from './crm.routing';

import { ContactComponent } from './components/contacts/contact.component';
import { CustomerService } from './services/customer.service';
import { UserComponent } from './components/user/user.component';
import { ManagerService } from './services/manager.service';



@NgModule({
  declarations: [
    ContactComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    PrimengImportsModule,
    CrudModule,
    CRMRoutingModule
  ],
  providers:[
    CustomerService,
    ManagerService
  ]
})
export class CRMModule { }
