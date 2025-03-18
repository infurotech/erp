import { Component, EventEmitter, Output } from '@angular/core';
import { CrudOptions } from 'src/app/common/crud/crud-options';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  bookings: { booked: boolean }[];
  summary: any[] = [
    { label: 'Total Booked', value: 0, icon: 'fa-bed' }
  ]
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
    if(this.bookings){
      var totalBooked = this.bookings.filter(booking => booking.booked == true).length;
      this.summary.find(summary => summary.label == 'Total Booked').value = totalBooked;
    }
  }
 
  async onAction(actionData: any) {
    if(actionData.event == "Update"){
      await this.bookingService.updateBooking(actionData.data.id, actionData.data).toPromise();
    } else if(actionData.event == "Create"){
      await this.bookingService.createBooking(actionData.data).toPromise();
    }
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
