import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengImportsModule } from '../common/primeng/primeng-import.module';
import { CrudModule } from '../common/crud/crud.module';
import { InventoryRoutingModule } from './inventory.routing';
import { ProductComponent } from './components/products/product.component';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    PrimengImportsModule,
    CrudModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
