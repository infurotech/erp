import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengImportsModule } from '../common/primeng/primeng-import.module';
import { CrudModule } from '../common/crud/crud.module';
import { CRMRoutingModule } from './crm.routing';

import { ContactComponent } from './components/contacts/contact.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { HostelComponent } from './components/hostel/hostel.component';
import { HostelService } from './services/hostel.service';
import { BookingService } from './services/booking.service';
import { BookingComponent } from './components/booking/booking.component';
import { LeadsComponent } from './components/leads/leads.component';
import { CRMService } from './services/crm.service';
import { ActivityComponent } from './components/contacts/tabs/activity/activity.component';
import { TasksComponent } from './components/contacts/tabs/tasks/tasks.component';
import { AppointmentComponent } from './components/contacts/tabs/appointment/appointment.component';
import { EmailComponent } from './components/contacts/tabs/email/email.component';
import { DealsComponent } from './components/contacts/cards/deals/deals.component';
import { TicketsComponent } from './components/contacts/cards/tickets/tickets.component';
import { CompanyComponent } from './components/contacts/cards/company/company.component';


@NgModule({
  declarations: [
    ContactComponent,
    CompaniesComponent,
    LeadsComponent,
    HostelComponent,
    BookingComponent,
    ActivityComponent,
    TasksComponent,
    AppointmentComponent,
    EmailComponent,
    DealsComponent,
    TicketsComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    PrimengImportsModule,
    CrudModule,
    CRMRoutingModule
  ],
  providers:[
    CRMService, HostelService, BookingService
  ]
})
export class CRMModule { }
