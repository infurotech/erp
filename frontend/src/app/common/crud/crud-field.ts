// src/app/models/field-metadata.ts
export interface CrudField {
  field: string; // The key of the field in T
  label: string; // Display label
  type: 'text' | 'number' | 'select' | 'date' | 'tag' | 'custom'; // Field type
  options?: { value: any; label: string, severity?: string }[]; // Options for select fields
  required?: boolean; // Validation
  key?: boolean;
  filter?:boolean;
}