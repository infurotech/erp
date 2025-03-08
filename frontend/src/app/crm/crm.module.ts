import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengImportsModule } from '../common/primeng/primeng-import.module';
import { CrudModule } from '../common/crud/crud.module';
import { CRMRoutingModule } from './crm.routing';

import { ContactComponent } from './components/contacts/contact.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CustomerService } from './services/customer.service';
import { HostelComponent } from './components/hostel/hostel.component';
import { HostelService } from './services/hostel.service';
import { BookingService } from './services/booking.service';
import { BookingComponent } from './components/booking/booking.component';
import { LeadsComponent } from './components/leads/leads.component';


@NgModule({
  declarations: [
    ContactComponent,
    CompaniesComponent,
    LeadsComponent,
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
