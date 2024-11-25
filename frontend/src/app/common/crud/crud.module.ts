import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengImportsModule } from '../primeng/primeng-import.module';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { BoardComponent } from './board/board.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
    imports: [
        CrudRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        PrimengImportsModule,
        FormsModule,
    ],
    declarations: [
        CrudComponent, 
        BoardComponent,
        GridComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [CrudComponent]
})
export class CrudModule { }
