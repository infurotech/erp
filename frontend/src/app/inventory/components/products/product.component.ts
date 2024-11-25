import { Component, OnInit } from '@angular/core';
import { CrudField } from '../../../common/crud/crud-field';
import { CrudOptions } from 'src/app/common/crud/crud-options';

@Component({
  selector: 'inventory-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.less'
})
export class ProductComponent implements OnInit {
  
  crudOptions:  CrudOptions = {
    boardView: false,
    gridEditing: false,
    fields:[
      { field: 'id', label: 'ID', type: 'number', required: true, key: true },
      { field: 'code', label: 'Code', type: 'text', required: true },
      { field: 'name', label: 'Name', type: 'text', required: true },
      { field: 'price', label: 'Price', type: 'number', required: true },
      { field: 'category', label: 'Category', type: 'select' },
      { field: 'status', label: 'Status', type: 'tag', options: 
        [ 
          {label: 'InStock', value:'instock', severity: 'success'},
          {label: 'LowStock', value:'lowstock', severity: 'warning'},
          {label: 'OutOfStock', value:'outofstock', severity: 'danger'}
        ] 
      },
      { field: 'sku', label: 'SKU', type: 'text', required: true },
      { field: 'supplier', label: 'Supplier', type: 'text', required: true },
      { field: 'material', label: 'Material', type: 'text', required: true },
      { field: 'country', label: 'Country', type: 'text', required: true },
      { field: 'col1', label: 'Column1', type: 'text', required: true },
      { field: 'col2', label: 'Column2', type: 'text', required: true },
      { field: 'col3', label: 'Column3', type: 'text', required: true },
      { field: 'col4', label: 'Column4', type: 'text', required: true }
    ]
  }
  
  constructor() {    
  }

  ngOnInit(): void {
  }

  products = [
    { id: 1, name: 'Laptop', price: 1200, category: 'Electronics', status: 'instock', code: 'P0009991', sku: 'SUDK112212', country:'India', supplier: 'IndiaMart', material:'Metal', col1: 'Additional 1', col2: 'Additional 2', col3:'Additional 3', col4: 'Additional 4' },
    { id: 2, name: 'Phone', price: 800, category: 'Electronics', status: 'instock', code: 'P0009991', sku: 'SUDK112212', country:'India', supplier: 'IndiaMart', material:'Metal', col1: 'Additional 1', col2: 'Additional 2', col3:'Additional 3', col4: 'Additional 4'  },
    { id: 3, name: 'Tablet', price: 800, category: 'Electronics', status: 'instock', code: 'P0009991', sku: 'SUDK112212', country:'India', supplier: 'IndiaMart', material:'Metal', col1: 'Additional 1', col2: 'Additional 2', col3:'Additional 3', col4: 'Additional 4'  },
    { id: 4, name: 'TV', price: 800, category: 'Electronics', status: 'lowstock', code: 'P0009991', sku: 'SUDK112212', country:'India', supplier: 'IndiaMart', material:'Metal', col1: 'Additional 1', col2: 'Additional 2', col3:'Additional 3', col4: 'Additional 4'  },
    { id: 5, name: 'Speakers', price: 800, category: 'Electronics', status: 'instock', code: 'P0009991', sku: 'SUDK112212', country:'India', supplier: 'IndiaMart', material:'Metal', col1: 'Additional 1', col2: 'Additional 2', col3:'Additional 3', col4: 'Additional 4'  },
    { id: 6, name: 'Microwave', price: 800, category: 'Electronics', status: 'instock', code: 'P0009991', sku: 'SUDK112212', country:'India', supplier: 'IndiaMart', material:'Metal', col1: 'Additional 1', col2: 'Additional 2', col3:'Additional 3', col4: 'Additional 4'  },
    { id: 7, name: 'Alexa', price: 800, category: 'Electronics', status: 'outofstock', code: 'P0009991', sku: 'SUDK112212', country:'India', supplier: 'IndiaMart', material:'Metal', col1: 'Additional 1', col2: 'Additional 2', col3:'Additional 3', col4: 'Additional 4'  },
  ];
}
