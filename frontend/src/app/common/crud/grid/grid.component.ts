import { Component, Input, OnInit } from '@angular/core';
import { CrudField } from '../crud-field';

@Component({
  selector: 'crud-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit {
  
  tableActionItems: any[];
  @Input() fields: Array<CrudField> = [];  // Field definitions
  @Input() data: any[] = [];           // List of items
  editTableColumns: boolean = false;

  ngOnInit(): void {
    this.tableActionItems = [
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
      }
    ];
  }

  getTagSeverity(field: CrudField, value: string){
    var severity = 'default';
    if(field.options){
      severity = field.options?.find(op => op.value == value)?.severity;
    }
    return severity;
  } 
  
  getTagLabel(field: CrudField, value: string){
    var label = value;
    if(field.options){
      label = field.options?.find(op => op.value == value)?.label;
    }
    return label;
  }
}
