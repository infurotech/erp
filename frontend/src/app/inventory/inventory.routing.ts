import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductComponent } from './components/products/product.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'products', pathMatch: 'full' },
        { path: 'products', component: ProductComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class InventoryRoutingModule {
}
