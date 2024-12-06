import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() field: string = '';
  @Input() filterType : 'text' | 'number' | 'select' | 'date' | 'tag' | 'custom' = 'text';
  @Input() filterOptions : any;
  @Output() filterChange  = new EventEmitter<any>();

  filterValue: any;
  searchKeyword: any;
  filteredItems: any[] = [];

  onFilterChange() {
    this.filterChange.emit({ field: this.field, value: this.filterValue });
  }

  onSearch() {
    this.filterChange.emit({ field: 'search' , value: this.searchKeyword});
  }

  onAutoCompleteItemSelect(event) { 
    this.filterValue = event?.value || '';

    this.filterChange.emit({ field: this.field , value: this.filterValue?.label});
  }

  filterItems(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.filterOptions.length; i++) {
        let item = this.filterOptions[i];
        if (item.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push({'label' : item});
        }
    }
    this.filteredItems = filtered;
  }
}
