import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CrudField } from '../crud-field';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';  
@Component({
  selector: 'crud-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit {
  @ViewChild('tableActions') tableActions: TieredMenu;  
  tableActionItems: MenuItem[] | undefined;
  @Input() fields: Array<CrudField> = [];  // Field definitions
  @Input() data: any[] = [];           // List of items
  editTableColumns: boolean = false;
  confirmDeleteDialog: boolean = false;
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() tableHeaders = new EventEmitter<CrudField[]>();
  @Output() openDialog = new EventEmitter<{ isEdit: boolean, item: any }>();  
  @Output() onClick = new EventEmitter<any>();
  selectedRows: any[] = [];
  selectedItem: any[];
  @Output() requestDelete = new EventEmitter<any>();  
  totalRecords: number = 1000; // Total records in DB
  loading: boolean = false;
  ngOnInit(): void {
    this.tableActionItems = [
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {
          if (this.selectedItem) {
            this.openDialog.emit({ isEdit: true, item: this.selectedItem });
          } else {
            alert('No item selected for editing');
          }
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          if (this.selectedItem) {
            this.requestDelete.emit(this.selectedItem);
          } else {
            alert('No item selected for editing');
          }
        },
      }
    ];
    this.emitTableHeaders();
  }

  openMenu(event, item) {
    this.selectedItem = item;
    this.tableActions.toggle(event);
  }

  click(event) {
    this.onClick.emit(event);
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

  onSelectionChange(event: any) {
    this.selectedRows = event;
    this.selectionChange.emit(this.selectedRows);
  }

  emitTableHeaders() {
    this.tableHeaders.emit(this.fields);
  }

}
