# ERP Repository - Microservice Setup Guide

Welcome to the ERP Microservice Setup Guide!

### Prerequisites

Ensure you have the following installed on your system:

* **Node.js** (v>=18)
* **Git**

## Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/infurotech/erp.git
```

#### 2. Install dependencies:

```bash
cd backend
npm install
```

#### 3. Build the Shared Package

Navigate to the shared folder and build the shared package:
```bash
cd backend/shared
npm run build
```

To run existing services.
Navigate to that service and in your terminal:
```bash
cd navigate/to/service
npm run start or npm run start:dev 
```
#### 4. Add your Microservice using git submodules
```bash
cd erp
git submodule add <submodule_github_url> <path>

for example ->
git submodule add https://github.com/infurotech/erp-accounting.git backend/erp-accounting

this will create erp-accounting microservice

Also you can check .gitmodules file for reference to services already added
```

#### 5. To change the branch of submodule
```bash
cd submodule
git checkout branch_name
```

#### 6. (Optional) If you want to use shared module in your submodule 
```bash
add shared folder path in your project tsconfig.json 
example "paths": {
            "@infuro/shared":["../../shared/dist"]
        }
```

Here we are using common package.json for all the microservices or modules in backend folder.
If you want to add packages add in backend/package.json and npm install to access in your submodule.
