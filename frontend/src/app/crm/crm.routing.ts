import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactComponent } from './components/contacts/contact.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'contacts', pathMatch: 'full' },
        { path: 'contacts', component: ContactComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CRMRoutingModule {
}
