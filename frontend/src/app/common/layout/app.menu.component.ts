import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'fa fa-gauge', routerLink: ['/'] },
                ]
            },
            {
                label: 'CRM',
                items: [
                    { label: 'Contacts', icon: 'fa fa-table-list', routerLink: ['/crm/contacts'] },
                    { label: 'Leads', icon: 'fa fa-handshake', routerLink: ['/common/empty'] },
                    { label: 'Opportunities', icon: 'fa fa-crown', routerLink: ['/common/empty'] },
                    { label: 'Marketing', icon: 'fa fa-paper-plane', routerLink: ['/common/empty'] },
                    { label: 'Analytics', icon: 'fa fa-chart-simple', routerLink: ['/common/empty'] },
                    { label: 'Hostels', icon: 'fa fa-bed', routerLink: ['/crm/hostels'] },
                ]
            },
            // {
            //     label: 'Sales',
            //     items: [
            //         { label: 'Orders', icon: 'fa fa-square-check', routerLink: ['/common/empty'] },
            //         { label: 'Invoices', icon: 'fa fa-receipt', routerLink: ['/common/empty'] },
            //         { label: 'Quotes', icon: 'fa fa-list-check', routerLink: ['/common/empty'] },
            //     ]
            // },
            // {
            //     label: 'Inventory',
            //     items: [
            //         { label: 'Stock', icon: 'fa fa-cubes-stacked', routerLink: ['/inventory/products'] },
            //         { label: 'Warehouses', icon: 'fa fa-warehouse', routerLink: ['/common/empty'] },
            //     ]
            // },
            // {
            //     label: 'HR',
            //     items: [
            //         { label: 'Payroll', icon: 'fa fa-money-check', routerLink: ['/common/empty'] },
            //         { label: 'Recruitement', icon: 'fa fa-check-double', routerLink: ['/common/empty'] },
            //         { label: 'Performance', icon: 'fa fa-bullseye', routerLink: ['/common/empty'] },
            //         { label: 'Leaves and Attendence', icon: 'fa fa-person-walking-arrow-right', routerLink: ['/common/empty'] },
            //         { label: 'Timesheet', icon: 'fa fa-clock', routerLink: ['/common/empty'] },
            //         { label: 'Reports', icon: 'fa fa-chart-gantt', routerLink: ['/common/empty'] },
            //     ]
            // },
            // {
            //     label: 'Finance',
            //     items: [
            //         { label: 'Chart of Accounts', icon: 'fa fa-book-open', routerLink: ['/common/empty'] },
            //         { label: 'Assets', icon: 'fa fa-box', routerLink: ['/common/empty'] },
            //         { label: 'Budgeting', icon: 'fa fa-percent', routerLink: ['/common/empty'] },
            //         { label: 'Reports', icon: 'fa fa-chart-line', routerLink: ['/common/empty'] },
            //     ]
            // },
            // {
            //     label: 'Admin',
            //     items: [
            //         { label: 'Users', icon: 'fa fa-user-tie', routerLink: ['/common/empty'] },
            //     ]
            // },
        ];
    }
}
