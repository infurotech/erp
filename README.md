# Infuro ERP

Welcome to **Infuro ERP** – an AI-native platform designed to accelerate the creation and management of modern ERP systems. Infuro ERP provides intelligent building blocks that simplify and streamline the development of ERP solutions of any scale. Each module is designed as a microservice, enabling seamless customization, extension, and independent deployment. Businesses can adapt these modules to fit their specific needs while benefiting from faster development, smarter automation, and continuous innovation powered by AI.

![CRM](./document/contacts.png)

## ✨ Key Features

- **📦 Full-Stack MEAN Integration**  
  Built using PostgreSQL, Express.js, Angular, and NestJS for modern enterprise web applications. Uses TypeORM, allowing easy migration to any SQL database of choice.

- **⚙️ Modular NestJS Backend**  
  Structured backend architecture with support for modular business domains and services.

- **🧩 Angular + PrimeNG UI**  
  Elegant and dynamic user interfaces using Angular with PrimeNG components.

- **🧪 Low-Code Friendly**  
  Leverages LLMs (Large Language Models) for generating code, enabling rapid scaffolding of modules and features with minimal manual input.

- **🔐 Secure Access & Authentication**  
  Includes robust JWT-based authentication, role-based access control (RBAC), and supports enterprise-grade standards such as OAuth2, SAML, and OpenID Connect for seamless single sign-on (SSO) and identity federation.

- **🛡️ Granular Access Management**  
  Provides fine-grained access controls across organizations, departments, and teams, enabling secure data visibility and operation-level permissions based on hierarchy and roles.

- **🌍 Internationalization (i18n)**  
  Multi-language support through Angular's i18n and backend message management.

- **🏢 Multitenancy Support**  
  Built-in support for tenant-aware architecture to serve multiple customers from a single deployment using isolated data contexts.

- **🎛️ Edition & Feature Management**  
  Easily manage different editions (e.g., Free, Pro, Enterprise) and control feature availability per tenant or user role, enabling flexible licensing models and pay-per-feature configurations.

- **📬 Event-Driven Architecture**  
  Supports reactive business logic using event emitters and queues (e.g., Redis, RabbitMQ, Kafka), ideal for scaling and decoupling services.

- **⚡ Caching, Queuing & Integrations**  
  First-class support for distributed caching, message queuing, and integration frameworks to develop high-performance, loosely coupled microservices that scale easily and communicate reliably.

- **🔄 Workflow Automation & Integration Ready**  
  Built-in support for custom workflows, webhook triggers, and third-party integrations makes it easy to automate processes and connect with external systems like CRMs, payment gateways, and analytics platforms.

- **✉️ Communication & Collaboration Tools**  
  Native support for incoming/outgoing emails, chat messaging, and call handling to streamline customer interactions, internal collaboration, and support workflows.

- **🧩 Customizable API-Driven Frontend**  
  The frontend is fully driven by data and APIs, allowing organizations to adapt UI and behavior dynamically based on their business needs. Includes out-of-the-box support for a rich library of standard UI components.

- **📄 Report & Document Generation**  
  Generate customizable reports and professional documents (PDF, DOCX, HTML) based on dynamic data, templates, and user-defined formats—ideal for invoices, contracts, financials, and operational insights.

- **🗂️ File Storage with Versioning**  
  Secure file storage system with built-in version control, enabling teams to manage, retrieve, and audit document history effectively across modules.

- **📁 Clean Project Structure**  
  Organized file structure for better scalability and developer productivity.


### Prerequisites
Ensure you have the following installed:

* Node.js (>= 16.x)
* Angular CLI (>= 15.x)
* NestJS CLI (>= 9.x)
* Yeoman CLI (npm install -g yo)
* MongoDB or any SQL database supported by TypeORM

## Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/infurotech/erp.git
cd erp
```

#### 2. Install dependencies:
Backend:

```bash
cd backend
npm install
```

Frontend:
``` bash
cd frontend
npm install
```

#### 3. Environment Configuration:
Backend:
Create a .env file in the backend directory:

```
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=erp_db
JWT_SECRET=your_jwt_secret
```

Frontend:
Modify environment.ts in the frontend/src/environments folder to configure API endpoints:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

#### 4. Start the Application:

Backend:

```
cd backend
npm run start:dev
```

Frontend:

```
cd frontend
ng serve
```

Access the app at http://localhost:4200.

## Project Structure

### Backend (/backend)

* **Modules:** Each module (e.g., users, products) is organized under the src folder.
* **TypeORM:** Define entities, repositories, and services for database interaction.
* **Controller:** Handle API endpoints for each module.

### Frontend (/frontend)
* **Modules:** Each feature has its own module (e.g., users, dashboard).
* **PrimeNG:** Pre-styled UI components.
* **Global Components:** Shared components like TableComponent and FormComponent.

Code Generation with Yeoman
Install the Yeoman Generator

```
npm install -g generator-erp
```

Generate a New Module

To generate a new module (backend and frontend):

```
yo erp:module <module-name>
```

This will:

* Create backend services, controllers, and entities.
* Create frontend components, routing, and services.

Example:

```yo erp:module inventory```

Output:

Backend:
* >src/modules/inventory

Frontend:
* >src/app/modules/inventory

Generate a Component in Frontend

```
yo erp:component <component-name> --module <module-name>
```
Example:

```
yo erp:component inventory-table --module inventory
```

### Adding Custom Modules

#### Backend

1. Generate a module using Yeoman or manually create it under src/modules.
2. Define an entity in entities folder.
3. Add service and controller for the module.
4. Register the module in app.module.ts.

#### Frontend

1. Add a new module under src/app/modules using Yeoman.
2. Create UI components using PrimeNG.
3. Configure routes in app-routing.module.ts.

### Best Practices

* **Modular Design:** Use the module structure for both frontend and backend to ensure scalability.
* **PrimeNG Components:** Leverage PrimeNG's powerful UI components for tables, forms, and charts.
* **Localization:** Use Angular's @angular/localize for multilingual support.
* **Backend Validation:** Use class-validator decorators in DTOs for backend input validation.
* **TypeORM Relations:** Define proper entity relationships for database consistency.

### Roadmap
Add more Yeoman templates for frequently used features.
Implement advanced reporting dashboards.
Enhance authentication with OAuth2 support.
Add real-time notifications using WebSockets.

### Contributing
We welcome contributions! Please follow these steps:

#### Fork the repository.
* Create a feature branch.
* Commit your changes.
* Submit a pull request.

For any queries or suggestions, please contact erp@infurotech.com
