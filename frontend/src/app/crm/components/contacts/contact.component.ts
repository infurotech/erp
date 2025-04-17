import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CRMService } from '../../services/crm.service';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { Router } from '@angular/router';
import { contactSchema } from './contact.schema';

@Component({
  selector: 'crm-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.less'
})
export class ContactComponent implements OnInit {
  users: string[] = [];
  contacts: [] = [];
  crudOptions: CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields: contactSchema
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
    await this.crmService.bulkUpload({ bulk: event.data }).toPromise();
  }
}
