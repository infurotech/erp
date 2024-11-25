import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'crud-board',
  styles: [
    `:host ::ng-deep {
        [pDraggable] {
            cursor: move;
        }
    }`
  ],
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {

  @Input()
  items!: any[];
  @Input()
  groupBy: string;

  draggedItem: any;
  groupedItems: Map<string, any[]>;
  columns: string[] = [];
  boardSettings: MenuItem[] | undefined;

  constructor() { }

  ngOnInit() {
    if(!this.items != null) {
      this.groupedItems = this.groupItems(this.items, this.groupBy);
      this.groupedItems.forEach((values, key) => {
        this.columns.push(key);
      });
    }

    this.boardSettings = [
      {
        label: 'Group By',
        icon: 'pi pi-file-export',
      }
    ]
  }

  dragStart(item: any) {
    this.draggedItem = item;
  }

  drop(column: any) {
    if(this.draggedItem){
      var itemIndex = this.groupedItems.get(this.draggedItem['status'])
        .findIndex(it => it.id === this.draggedItem.id);
      if(itemIndex >= 0){
        this.groupedItems.get(this.draggedItem['status']).splice(itemIndex,1);
      }
      this.groupedItems.get(column).push(this.draggedItem);
    }
  }

  dragEnd() {
    this.draggedItem = null;
  }

  getGroups(groupedItems: { [key: string]: any[] }): string[] {
    var keys = Object.keys(groupedItems);
    console.log(groupedItems);
    return keys;
  }

  groupItems(items, field){
    return items.reduce((map, item) => {
      const key = item[field];
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)?.push(item);
      return map;
    }, new Map<string, any[]>());
  }
}


// export interface Product {
//   id?: string;
//   code?: string;
//   name?: string;
//   description?: string;
//   price?: number;
//   quantity?: number;
//   inventoryStatus?: string;
//   category?: string;
//   image?: string;
//   rating?: number;
// }

// export interface Country {
//   name?: string;
//   code?: string;
// }

// export interface Representative {
//   name?: string;
//   image?: string;
// }

// export interface Customer {
//   id?: number;
//   name?: string;
//   country?: Country;
//   company?: string;
//   date?: string | Date;
//   status?: string;
//   activity?: number;
//   representative?: Representative;
//   verified?: boolean;
//   balance?: number;
// }