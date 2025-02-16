import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengImportsModule } from '../common/primeng/primeng-import.module';
import { CrudModule } from '../common/crud/crud.module';
import { CRMRoutingModule } from './crm.routing';

import { ContactComponent } from './components/contacts/contact.component';
import { CustomerService } from './services/customer.service';
import { HostelComponent } from './components/hostel/hostel.component';
import { HostelService } from './services/hostel.service';
import { BookingService } from './services/booking.service';
import { BookingComponent } from './components/booking/booking.component';


@NgModule({
  declarations: [
    ContactComponent,
    HostelComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    PrimengImportsModule,
    CrudModule,
    CRMRoutingModule
  ],
  providers:[
    CustomerService, HostelService, BookingService
  ]
})
export class CRMModule { }
