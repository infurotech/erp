import { CrudField } from "src/app/common/crud/crud-field";

export const contactSchema: CrudField[] = [
  { field: 'id', label: 'ID', type: 'text', required: false, key: true },
  { field: 'first_name', label: 'First Name', type: 'text', filter: true, required: true },
  { field: 'last_name', label: 'Last Name', type: 'text', filter: true, required: true },
  { field: 'full_name', label: 'Full Name', type: 'text', filter: true, required: false },
  { field: 'email', label: 'Email', type: 'text', filter: true, required: true },
  { field: 'phone', label: 'Phone', type: 'text', filter: true, required: false },
  { field: 'mobile', label: 'Mobile', type: 'text', filter: true, required: false },
  { field: 'company', label: 'Company', type: 'tag', filter: true, required: false, options: [] }, // Populate dynamically
  { field: 'job_title', label: 'Job Title', type: 'text', filter: true, required: false },
  {
    field: 'lead_status', label: 'Lead Status', type: 'tag', filter: true, required: true, options: [
      { label: 'New', value: 'New', severity: 'info' },
      { label: 'Contacted', value: 'Contacted', severity: 'warning' },
      { label: 'Qualified', value: 'Qualified', severity: 'success' },
      { label: 'Converted', value: 'Converted', severity: 'success' },
      { label: 'Lost', value: 'Lost', severity: 'danger' }
    ]
  },
  {
    field: 'relationship_status', label: 'Relationship', type: 'tag', filter: true, required: false, options: [
      { label: 'Prospect', value: 'Prospect', severity: 'info' },
      { label: 'Customer', value: 'Customer', severity: 'success' },
      { label: 'Partner', value: 'Partner', severity: 'primary' },
      { label: 'Supplier', value: 'Supplier', severity: 'warning' }
    ]
  },
  { field: 'assigned_to', label: 'Assigned To', type: 'tag', filter: true, required: false, options: [] }, // Populate dynamically
  // { field: 'created_at', label: 'Created At', type: 'date', required: false },
  // { field: 'updated_at', label: 'Updated At', type: 'date', required: false }
]
