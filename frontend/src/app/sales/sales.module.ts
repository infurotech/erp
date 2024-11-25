import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengImportsModule } from '../common/primeng/primeng-import.module';
import { CrudModule } from '../common/crud/crud.module';

import { SalesRoutingModule } from './sales.routes';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CrudModule,
    PrimengImportsModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
