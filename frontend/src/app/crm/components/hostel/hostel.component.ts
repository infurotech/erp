import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudField } from '../../../common/crud/crud-field';
import { CustomerService } from '../../services/customer.service';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { CrudModule } from "../../../common/crud/crud.module";
import { HostelService } from '../../services/hostel.service';

@Component({
  selector: 'crm-hostel',
  templateUrl: './hostel.component.html',
})

export class HostelComponent implements OnInit{
    hostels: [];
    crudOptions:  CrudOptions = {
      boardView: false,
      gridEditing: false,
      fields: [
        { field: 'name', label: 'Name', type: 'text', required: true },
        { field: 'address', label: 'Address', type: 'text', required: true },
        { field: 'imageUrls', label: 'Image URLs', type: 'custom', required: true },
        { field: 'latitude', label: 'Latitude', type: 'number', required: true },
        { field: 'longitude', label: 'Longitude', type: 'number', required: true },
        { field: 'hostelType', label: 'Hostel Type', type: 'text', required: true },
        { field: 'roomType', label: 'Room Type', type: 'text', required: true },
        { field: 'pricePerMonth', label: 'Price per Month', type: 'number', required: true },
        { field: 'availableUnits', label: 'Available Units', type: 'number', required: true },
        { field: 'amenities', label: 'Amenities', type: 'tag', required: true, filter: true, options: [
            { label: 'AC Rooms', value: 'AC Rooms' },
            { label: '24/7 Security', value: '24/7 Security' },
            { label: 'Mess', value: 'Mess' },
            { label: 'WiFi', value: 'WiFi' },
            { label: 'Parking', value: 'Parking' },
            { label: 'Laundry', value: 'Laundry' },
            { label: 'Power Backup', value: 'Power Backup' },
            { label: 'Gym', value: 'Gym' },
            { label: 'TV', value: 'TV' },
            { label: 'Shared Kitchen', value: 'Shared Kitchen' }
        ] },
        { field: 'other_offerings', label: 'Other Offerings', type: 'tag', filter: true, options: [
            { label: 'Daily Housekeeping', value: 'Daily Housekeeping' },
            { label: 'Hot Water', value: 'Hot Water' },
            { label: 'Free Snacks', value: 'Free Snacks' },
            { label: 'Gym Access', value: 'Gym Access' },
            { label: 'Recreational Room', value: 'Recreational Room' },
            { label: 'Free Breakfast', value: 'Free Breakfast' },
            { label: 'Study Room', value: 'Study Room' }
        ] },
        { field: 'status', label: 'Status', type: 'tag', filter: true, options: [
            { label: 'Available', value: 'available', severity: 'success' },
            { label: 'Occupied', value: 'occupied', severity: 'danger' },
            { label: 'Under Maintenance', value: 'under_maintenance', severity: 'warning' }
        ] }
      ]
      
    }
    selectedUser:string = '';
    @Output() contactsChange = new EventEmitter<any[]>();
  
    fieldOption: any[];
    constructor(
      private hostelService: HostelService
    ) {
    }
  
    async ngOnInit() {
      this.fieldOption = this.crudOptions.fields;
      this.hostels = await this.hostelService.getAllProperties().toPromise();
    }
    
   
    onAction(actionData: any): void {
    }
  
    onFilterChange(event){
    }
  
    onClear() {
      this.selectedUser = null;
    }
  
    async getBulkImport(event) {
      
      const properties = await this.hostelService.bulkUploadProperty({bulk: event.data}).toPromise();
    }
  }