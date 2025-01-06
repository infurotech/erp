import { Component, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CrudField } from '../crud-field';
import { MultiSelectSelectAllChangeEvent } from 'primeng/multiselect';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  @Input() fields: CrudField[];
  @Input() fieldOptions : any;
  @Input() isDeleteButtonVisible : boolean = false;
  @Output() filterChange  = new EventEmitter<any>();
  @Output() resetFilter = new EventEmitter<any>();
  @Output() saveFilter = new EventEmitter<any>();
  @Output() deleteData = new EventEmitter<any>();

  @Input() filterTemplates!: QueryList<TemplateRef<any>>;

  tagFilterValues: { [key: string]: any[] } = {};
  customFilterValue: any;
  searchKeyword: any;
  filteredItems: any[] = [];
  filteredFields: Array<CrudField> = []
  moreFilters: any[];
  selectedFilters: CrudField[] = [];
  
  ngOnInit() {
    this.filteredFields = this.fields.filter(field => !field.key && field.filter === true).slice(0, 2);
    this.moreFilters = this.fields.filter(field => !field.key && field.filter === true).slice(2);
  }

  onFilterChange(header:any) {
    this.filterChange.emit({ field: header.type , header: header.field, value:  this.tagFilterValues[header.field] });
  }

  onSearch() {
    this.filterChange.emit({ field: 'search' , value: this.searchKeyword});
  }

  onAutoCompleteItemSelect(event:any ,header:any) {
    this.customFilterValue = event?.value || '';
    
    this.filterChange.emit({ field: 'custom' , header: header.field, value: this.customFilterValue.label});
  }

  filterItems(event: AutoCompleteCompleteEvent, field:string) {
    let filterOptions = this.fieldOptions[field];
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < filterOptions?.length; i++) {
        let item = filterOptions[i];
        if (item.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push({'label' : item});
        }
    }
    this.filteredItems = filtered;
  }

  selectFilter(event: any) {
    if(!event.originalEvent.selected) {
      this.selectedFilters.forEach(filter => {
        if (!this.filteredFields.includes(filter)) {
          this.filteredFields.push(filter);
        }
      });
    }
    else {
      this.filteredFields.forEach((filter,index) => {
          if(index>1 && !this.selectedFilters.includes(filter)) {
            this.filteredFields.splice(index,1);
          }
      });
    }
  }

  onMultiSelectAllChange(event : MultiSelectSelectAllChangeEvent) {
    if(!event.checked) {
      this.filteredFields.splice(2);
    }
  }
  
  saveFilterEvent() {
    this.saveFilter.emit();
  }

  onDeleteEvent() {
    this.deleteData.emit()
  }

  resetAllFilters() {
    this.searchKeyword = '';
    this.customFilterValue = '';
    this.tagFilterValues = {};
    this.resetFilter.emit();
  }

  onCustomFilterChange(field: string , type: string , value: any) {
    this.tagFilterValues[field] = value;
    const temp = {type: type , field: field};
    this.onFilterChange(temp);
  }
}