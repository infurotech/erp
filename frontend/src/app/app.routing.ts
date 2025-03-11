import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { AppLayoutComponent } from "./common/layout/app.layout.component";
import { AuthGuard } from './shared/AuthGuard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'crm', loadChildren: () => import('./crm/crm.module').then(m => m.CRMModule) },
                    { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
                    { path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
                    { path: 'common', loadChildren: () => import('./common/common.module').then(m => m.AppCommonModule) }
                ],
                canActivate: [AuthGuard]
            },
            { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', enableTracing: false },
    )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
