import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account.routing';
import { AuthService } from '../shared/AuthService';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule
    ],
    providers:[AuthService]
})
export class AccountModule { }
