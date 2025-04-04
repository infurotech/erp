import { Component, OnInit } from '@angular/core';
import { ViewOptions } from 'src/app/common/crud/view/view.options';
import { DealsComponent } from '../cards/deals/deals.component';
import { TicketsComponent } from '../cards/tickets/tickets.component';
import { ActivityComponent } from '../tabs/activity/activity.component';
import { EmailComponent } from '../tabs/email/email.component';
import { TasksComponent } from '../tabs/tasks/tasks.component';
import { AppointmentComponent } from '../tabs/appointment/appointment.component';
import { CompanyComponent } from '../cards/company/company.component';
import { contactSchema } from '../contact.schema';
import { CrudField } from 'src/app/common/crud/crud-field';
import { ActivatedRoute } from '@angular/router';
import { CRMService } from 'src/app/crm/services/crm.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ContactViewComponent implements OnInit {
  fields: CrudField[] = contactSchema;
  viewOptions: ViewOptions = {
    headerFields: ['full_name', 'job_title', 'lead_status', 'relationship_status', 'assigned_to'],
    tabs: [
      { header: 'Tasks' , component: TasksComponent}, 
      { header: 'Activity', component: ActivityComponent }, 
      { header: 'Emails', component: EmailComponent }, 
      { header: 'Appointments', component: AppointmentComponent }],
    actions: [
      {
        label: 'Emails',
        icon: 'pi pi-fw pi-envelope',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-pencil',
          }
        ]
      },
      {
        label: 'Calls',
        icon: 'pi pi-fw pi-phone',
        items: [
          {
            label: 'Log',
            icon: 'pi pi-fw pi-notes'
          }
        ]
      },
      {
        label: 'Appointment',
        icon: 'pi pi-fw pi-calendar'
      },
      {
        label: 'Tasks',
        icon: 'pi pi-fw pi-list',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-check'
          }
        ]
      }
    ],
    cards: [
      { header: 'Company', component: CompanyComponent }, 
      { header: 'Deals', component: DealsComponent }, 
      { header: 'Tickets', component: TicketsComponent }
    ]
  }
  contact: any;

  constructor(
    private route: ActivatedRoute,
    private crmService: CRMService,
  ) {
    this.crmService.setPath('/contacts')
  }

  async ngOnInit() {
    const params = await firstValueFrom(this.route.params);
    this.contact = await firstValueFrom(this.crmService.getById(params['id']));
  }
}
