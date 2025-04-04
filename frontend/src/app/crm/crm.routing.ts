import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactComponent } from './components/contacts/contact.component';
import { HostelComponent } from './components/hostel/hostel.component';
import { BookingComponent } from './components/booking/booking.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { LeadsComponent } from './components/leads/leads.component';
import { ContactViewComponent } from './components/contacts/view/view.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'contacts', pathMatch: 'full' },
        {
            path: 'contacts', children: [
                { path: '', component: ContactComponent },
                { path: 'view/:id', component: ContactViewComponent },
            ]
        },
        { path: 'companies', component: CompaniesComponent },
        { path: 'leads', component: LeadsComponent },
        { path: 'hostels', component: HostelComponent },
        { path: 'bookings', component: BookingComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CRMRoutingModule {
}
