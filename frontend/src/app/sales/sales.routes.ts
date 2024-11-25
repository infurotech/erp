import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [RouterModule.forChild([
        // { path: '', redirectTo: 'orders', pathMatch: 'full' },
        // { path: 'orders', component: OrderComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SalesRoutingModule {
}
