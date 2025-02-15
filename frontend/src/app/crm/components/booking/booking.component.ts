import { Component, EventEmitter, Output } from '@angular/core';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  bookings: [];
  crudOptions:  CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields: [
      { field: 'id', label: 'Id', type: 'text', required: true },
      { field: 'name', label: 'Name', type: 'text', required: true },
      { field: 'email', label: 'Email', type: 'text', required: true },
      { field: 'phone', label: 'Phone', type: 'text', required: true }, 
      { field: 'booked', label: 'Booked', type: 'tag', filter: true,  required: true, options:[
        { label: 'Booked', value: true, severity: "danger" },
        { label: 'Available', value: false, severity: "success"}
      ] },
      { field: 'propertyid', label: 'Property', type: 'text', required: true },
    ]
  }
  selectedUser:string = '';
  @Output() contactsChange = new EventEmitter<any[]>();

  fieldOption: any[];
  constructor(
    private bookingService: BookingService
  ) {
  }

  async ngOnInit() {
    this.fieldOption = this.crudOptions.fields;
    this.bookings = await this.bookingService.getAllBookins().toPromise();
  }
  
 
  async onAction(actionData: any) {
    console.log(actionData);
    const booking = await this.bookingService.createBooking(actionData).toPromise();
  }

  onFilterChange(event){
  }

  onClear() {
    this.selectedUser = null;
  }

  async getBulkImport(event) {
    
    const properties = await this.bookingService.bulkUploadBooking({bulk: event.data}).toPromise();
  }

}
