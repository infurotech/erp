import { AfterViewInit, Component, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ViewOptions } from './view.options';
import { CrudField } from '../crud-field';

@Component({
  selector: 'crud-detail-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, AfterViewInit{

  @Input() viewHeaderTemplate!: TemplateRef<any>;
  @Input() options: ViewOptions;
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

  /**
   *
   */
  constructor() {
  }
  
  ngOnInit(): void {
    console.log(this.item)
    if(this.options){
      if(this.options.actions){
        this.options.actions.push(...[{
          label: 'More',
          icon: 'pi pi-fw pi-ellipsis-v',
          items: [...this.actions]
        }]);
        this.actions = this.options.actions;
      }
      if(this.options.headerFields){
        this.headers = this.options.headerFields;
      }
      if(this.options.tabs){
        this.options.tabs.push(...this.tabs);
        this.tabs = this.options.tabs;
      }
      if(this.options.cards){
        this.cards.push(...this.options.cards);
      }
    }
  }

  ngAfterViewInit() {
    // Ensure ViewChild elements are available
    this.loadTabComponents();
    this.loadCardComponents();
  }

  loadTabComponents() {
    this.tabContainers.forEach((container, index) => {
      const componentType = this.options.tabs[index]?.component;
      if (componentType) {
        container.createComponent(componentType);
      }
    });
  }

  loadCardComponents() {
    this.cardContainers.forEach((container, index) => {
      const componentType = this.options.cards[index]?.component;
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
