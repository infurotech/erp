import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ViewOptions } from './view.options';
import { CrudField } from '../crud-field';

@Component({
  selector: 'app-detail-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, AfterViewInit{

  @Input() viewHeaderTemplate!: TemplateRef<any>;
  @Input() viewOptions: ViewOptions;
  @Input() item: any;
  @Input() fields: CrudField[] = []; 

  @ViewChildren('tabContainers', { read: ViewContainerRef }) tabContainers!: QueryList<ViewContainerRef>;
  @ViewChildren('cardContainers', { read: ViewContainerRef }) cardContainers!: QueryList<ViewContainerRef>;

  actions = [
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil'
    },
    {
      label: 'Archive',
      icon: 'pi pi-fw pi-trash'
    }
  ];

  tabs = [];

  cards = []

  headers: string[]

  constructor(private cdr: ChangeDetectorRef) {
  }
  
  ngOnInit(): void {
    if(this.viewOptions){
      if(this.viewOptions.actions){
        this.viewOptions.actions.push(...[{
          label: 'More',
          icon: 'pi pi-fw pi-ellipsis-v',
          items: [...this.actions]
        }]);
        this.actions = this.viewOptions.actions;
      }
      if(this.viewOptions.headerFields){
        this.headers = this.viewOptions.headerFields;
      }
      if(this.viewOptions.tabs){
        this.viewOptions.tabs.push(...this.tabs);
        this.tabs = this.viewOptions.tabs;
      }
      if(this.viewOptions.cards){
        this.cards.push(...this.viewOptions.cards);
      }
    }
  }

  ngAfterViewInit() {
    // Ensure ViewChild elements are available
    this.loadTabComponents();
    this.loadCardComponents();
    this.cdr.detectChanges();
  }

  loadTabComponents() {
    this.tabContainers.forEach((container, index) => {
      const componentType = this.viewOptions.tabs[index]?.component;
      if (componentType) {
        container.createComponent(componentType);
      }
    });
  }

  loadCardComponents() {
    this.cardContainers.forEach((container, index) => {
      const componentType = this.viewOptions.cards[index]?.component;
      if (componentType) {
        container.createComponent(componentType);
      }
    });
  }

  getField(name){
    const field = this.fields.find(f => f.field == name);
    return field;
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
