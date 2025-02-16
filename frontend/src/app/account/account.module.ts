import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account.routing';
import { LoginService } from './services/login.service';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule
    ],
    providers:[LoginService]
})
export class AccountModule { }
