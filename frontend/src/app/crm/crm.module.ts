import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengImportsModule } from '../common/primeng/primeng-import.module';
import { CrudModule } from '../common/crud/crud.module';
import { CRMRoutingModule } from './crm.routing';

import { ContactComponent } from './components/contacts/contact.component';
import { CustomerService } from './services/customer.service';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    PrimengImportsModule,
    CrudModule,
    CRMRoutingModule
  ],
  providers:[
    CustomerService
  ]
})
export class CRMModule { }
