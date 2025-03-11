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


// {
//   "tables": {
//     "products": {
//       "columns": {
//         "id": "UUID PRIMARY KEY",
//         "name": "VARCHAR(255) NOT NULL",
//         "description": "TEXT",
//         "brand_id": "UUID REFERENCES brands(id)",
//         "is_active": "BOOLEAN DEFAULT TRUE",
//         "seo_title": "VARCHAR(255)",
//         "seo_description": "TEXT",
//         "seo_keywords": "TEXT",
//         "slug": "VARCHAR(255) UNIQUE NOT NULL",
//         "created_at": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
//         "updated_at": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
//       },
//       "indexes": [
//         "name",
//         "brand_id",
//         "slug"
//       ]
//     },
//     "product_categories": {
//       "columns": {
//         "id": "UUID PRIMARY KEY",
//         "product_id": "UUID REFERENCES products(id) ON DELETE CASCADE",
//         "category_id": "UUID REFERENCES categories(id) ON DELETE CASCADE"
//       },
//       "indexes": [
//         "product_id",
//         "category_id"
//       ]
//     },
//     "product_variants": {
//       "columns": {
//         "id": "UUID PRIMARY KEY",
//         "product_id": "UUID REFERENCES products(id) ON DELETE CASCADE",
//         "sku": "VARCHAR(100) UNIQUE NOT NULL",
//         "barcode": "VARCHAR(100) UNIQUE",
//         "price": "DECIMAL(10,2) NOT NULL",
//         "stock_quantity": "INTEGER NOT NULL",
//         "is_active": "BOOLEAN DEFAULT TRUE",
//         "created_at": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
//         "updated_at": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
//       },
//       "indexes": [
//         "sku",
//         "product_id"
//       ]
//     },
//     "product_variant_attributes": {
//       "columns": {
//         "id": "UUID PRIMARY KEY",
//         "variant_id": "UUID REFERENCES product_variants(id) ON DELETE CASCADE",
//         "attribute_name": "VARCHAR(255) NOT NULL",
//         "attribute_value": "VARCHAR(255) NOT NULL",
//         "attribute_unit": "VARCHAR(50)"
//       },
//       "indexes": [
//         "variant_id",
//         "attribute_name"
//       ]
//     },
//     "categories": {
//       "columns": {
//         "id": "UUID PRIMARY KEY",
//         "name": "VARCHAR(255) NOT NULL",
//         "parent_id": "UUID REFERENCES categories(id)",
//         "slug": "VARCHAR(255) UNIQUE NOT NULL"
//       },
//       "indexes": [
//         "name",
//         "slug"
//       ]
//     },
//     "brands": {
//       "columns": {
//         "id": "UUID PRIMARY KEY",
//         "name": "VARCHAR(255) NOT NULL",
//         "slug": "VARCHAR(255) UNIQUE NOT NULL"
//       },
//       "indexes": [
//         "name",
//         "slug"
//       ]
//     },
//     "vendors": {
//       "columns": {
//         "id": "UUID PRIMARY KEY",
//         "name": "VARCHAR(255) NOT NULL",
//         "contact_email": "VARCHAR(255)",
//         "contact_phone": "VARCHAR(50)",
//         "address": "TEXT"
//       },
//       "indexes": [
//         "name"
//       ]
//     },
//     "product_vendors": {
//       "columns": {
//         "id": "UUID PRIMARY KEY",
//         "product_id": "UUID REFERENCES products(id) ON DELETE CASCADE",
//         "vendor_id": "UUID REFERENCES vendors(id) ON DELETE CASCADE",
//         "vendor_sku": "VARCHAR(100)",
//         "purchase_price": "DECIMAL(10,2)",
//         "stock_quantity": "INTEGER NOT NULL DEFAULT 0",
//         "lead_time_days": "INTEGER DEFAULT 0",
//         "is_preferred_vendor": "BOOLEAN DEFAULT FALSE"
//       },
//       "indexes": [
//         "product_id",
//         "vendor_id"
//       ]
//     },
//     "product_images": {
//       "columns": {
//         "id": "UUID PRIMARY KEY",
//         "variant_id": "UUID REFERENCES product_variants(id) ON DELETE CASCADE",
//         "image_url": "TEXT NOT NULL",
//         "alt_text": "TEXT"
//       },
//       "indexes": [
//         "variant_id"
//       ]
//     }
//   }
// }
