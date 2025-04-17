import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { CRMService } from '../../services/crm.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {
  users: string[] = [];
  companies: [] = [];
  crudOptions: CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields: [
      { field: 'id', label: 'ID', type: 'text', required: false, key: true },
      { field: 'name', label: 'Company Name', type: 'text', filter: true, required: true },
      { field: 'industry', label: 'Industry', type: 'text', filter: true, required: false },
      {
        field: 'business_type', label: 'Business Type', type: 'tag', filter: true, required: false, options: [
          { label: 'B2B', value: 'B2B' },
          { label: 'B2C', value: 'B2C' }
        ]
      },
      { field: 'website', label: 'Website', type: 'text', filter: false, required: false },
      // { field: 'created_at', label: 'Created At', type: 'date', required: false },
      // { field: 'updated_at', label: 'Updated At', type: 'date', required: false }
    ]
  }

  @Output() contactsChange = new EventEmitter<any[]>();

  fieldOption: any[];
  
    constructor(
      private crmService: CRMService
    ) {
      this.crmService.setPath('/companies')
    }
    
    async ngOnInit() {
      this.fieldOption = this.crudOptions.fields;
      this.companies = await this.crmService.getAll().toPromise();
    }
    
    async onAction(actionData: any) {
      if(actionData.event == "Update"){
        await this.crmService.update(actionData.data.id, actionData.data).toPromise();
      } else if(actionData.event == "Create"){
        await this.crmService.create(actionData.data).toPromise();
      }
    }
  
    onFilterChange(event){
    }
  
    onClear() {
      // this.selectedUser = null;
    }
  
    async getBulkImport(event) {
      
      const properties = await this.crmService.bulkUpload({bulk: event.data}).toPromise();
    }
}
