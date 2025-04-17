import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengImportsModule } from '../primeng/primeng-import.module';
import { CommonModule } from '@angular/common';

import { CrudComponent } from './crud.component';
import { BoardComponent } from './board/board.component';
import { GridComponent } from './grid/grid.component';
import { FilterComponent } from './filter/filter.component';
import { ImportComponent } from './import/import.component';
import { ViewComponent } from './view/view.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PrimengImportsModule,
        FormsModule,
    ],
    declarations: [
        CrudComponent, 
        BoardComponent,
        GridComponent,
        FilterComponent,
        ImportComponent,
        ViewComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [CrudComponent, ViewComponent]
})
export class CrudModule { }
