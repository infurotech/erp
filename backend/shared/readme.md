# 📦 Shared Library  

This shared library is used for the following tasks:  

1. Base CRUD Service  
2. Multi-Tenancy Establishment  
3. Audit Logging  
4. Authentication  
5. Request-Response Logging  

---

## 📥 Installation  

```sh
# Navigate to the root directory
npm install

# Move to the shared library folder
cd shared

# Build the library
npm run build

🛠️ Usage
Basic Example
export class ServiceName extends CrudService<Entity> {
  constructor(
    databaseService: DatabaseService,
    @InjectRepository(Entity) private readonly serviceRepo: Repository<Entity>,
  ) {
    super(databaseService, serviceRepo);
  }
}

## 📥 Auth Module  
This module binds the user payload to the request object, ensuring seamless authentication and access control.  

---

## 📥 Tenant Override Middleware  
This middleware allows dynamic configuration of database settings, including **database name, user, and password**, enabling multi-tenant support.  

---

## 📥 Request Context Module  
This module stores **user payload and tenant details** in local storage, making them available for later use across the application.  

---
## 📥 Tenant Module  
This module verifies the tenant database and dynamically overrides it to the correct repository, ensuring seamless multi-tenancy support.  

---

## 📥 Audit Log Module  
This module handles audit logging by triggering events **after insert, update, and delete operations**, ensuring complete tracking of data changes.  



