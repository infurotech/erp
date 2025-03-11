import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CRMService } from '../../services/crm.service';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { Router } from '@angular/router';
import { ViewOptions } from 'src/app/common/crud/view/view.options';
import { DealsComponent } from './cards/deals/deals.component';
import { TicketsComponent } from './cards/tickets/tickets.component';
import { ActivityComponent } from './tabs/activity/activity.component';
import { EmailComponent } from './tabs/email/email.component';
import { TasksComponent } from './tabs/tasks/tasks.component';
import { AppointmentComponent } from './tabs/appointment/appointment.component';
import { CompanyComponent } from './cards/company/company.component';

@Component({
  selector: 'crm-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.less'
})
export class ContactComponent implements OnInit {
  users: string[] = [];
  contacts: [] = [];
  viewOptions: ViewOptions = {
    headerFields: ['full_name', 'job_title', 'lead_status', 'relationship_status', 'assigned_to'],
    tabs: [
      { header: 'Activity', component: ActivityComponent }, 
      { header: 'Emails', component: EmailComponent }, 
      { header: 'Tasks' , component: TasksComponent}, 
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
  crudOptions: CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields: [
      { field: 'id', label: 'ID', type: 'text', required: false, key: true },
      { field: 'first_name', label: 'First Name', type: 'text', filter: true, required: true },
      { field: 'last_name', label: 'Last Name', type: 'text', filter: true, required: true },
      { field: 'full_name', label: 'Full Name', type: 'text', filter: true, required: false },
      { field: 'email', label: 'Email', type: 'text', filter: true, required: true },
      { field: 'phone', label: 'Phone', type: 'text', filter: true, required: false },
      { field: 'mobile', label: 'Mobile', type: 'text', filter: true, required: false },
      { field: 'company', label: 'Company', type: 'tag', filter: true, required: false, options: [] }, // Populate dynamically
      { field: 'job_title', label: 'Job Title', type: 'text', filter: true, required: false },
      {
        field: 'lead_status', label: 'Lead Status', type: 'tag', filter: true, required: true, options: [
          { label: 'New', value: 'New', severity: 'info' },
          { label: 'Contacted', value: 'Contacted', severity: 'warning' },
          { label: 'Qualified', value: 'Qualified', severity: 'success' },
          { label: 'Converted', value: 'Converted', severity: 'success' },
          { label: 'Lost', value: 'Lost', severity: 'danger' }
        ]
      },
      {
        field: 'relationship_status', label: 'Relationship', type: 'tag', filter: true, required: false, options: [
          { label: 'Prospect', value: 'Prospect', severity: 'info' },
          { label: 'Customer', value: 'Customer', severity: 'success' },
          { label: 'Partner', value: 'Partner', severity: 'primary' },
          { label: 'Supplier', value: 'Supplier', severity: 'warning' }
        ]
      },
      { field: 'assigned_to', label: 'Assigned To', type: 'tag', filter: true, required: false, options: [] }, // Populate dynamically
      // { field: 'created_at', label: 'Created At', type: 'date', required: false },
      // { field: 'updated_at', label: 'Updated At', type: 'date', required: false }
    ]
  }
  selectedUser: string = '';
  @Output() contactsChange = new EventEmitter<any[]>();

  fieldOption: any[];
  constructor(
    private crmService: CRMService,
    private router: Router
  ) {
    this.crmService.setPath('/contacts')
  }

  async ngOnInit() {
    this.fieldOption = this.crudOptions.fields;
    this.contacts = await this.crmService.getAll().toPromise();
  }

  async onAction(actionData: any) {
    if (actionData.event == "Update") {
      await this.crmService.update(actionData.data.id, actionData.data).toPromise();
    } else if (actionData.event == "Create") {
      await this.crmService.create(actionData.data).toPromise();
    }
  }

  onFilterChange(event) {
  }

  onClear() {
    this.selectedUser = null;
  }

  click(contact) {
    this.router.navigate([this.router.url, 'view', contact.id])
  }

  async getBulkImport(event) {

    const properties = await this.crmService.bulkUpload({ bulk: event.data }).toPromise();
  }
}
