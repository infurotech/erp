# ERP Custom Filter Template

This template enables you to create a custom filter using Angular content projection in PrimeNG. It can be reused across different components.

## Syntax 

```html
<ng-template #filterTemplate let-onFilterChange="onFilterChange">
 <!-- Add your desired input type here -->
</ng-template>
```

* **filterTemplate:** The filterTemplate is the child ID used to bind the template within your component.
* **let-onFilterChange:** onFilterChange is a local variable made available within the template.
* **onFilterChange:** A reference to the method onCustomFilterChange behind the template. Use onFilterChange to bind the method.
* onFilterChange(property, type, data) needs property that you need to filter, type of data and value as input.
* **Expected Types:** text, number, search (For adding search as a filter) etc.

## Example
main.html
``` html
<example-component.html [input1]="input1" [input2]="input2"
                        (output)="output()">

    <!-- Custom template -->
    <ng-template #filterTemplate let-onFilterChange="onFilterChange">
        <!-- Example Input type to add 
                exampleData =  ['User 1' , 'User 2' , 'User 3']}
                fields = [{ field: 'id', label: 'ID', type: 'number', required: true, key: true },
                        { field: 'name', label: 'Name', type: 'text', filter:true, required: true }]
                I want to filter based on field name of type text so passed name and text. -->

        <p-dropdown [options]="exampleData" (onChange)="onFilterChange('name', 'text', $event.value)"/>
    </ng-template>

</example-component.html>
```