import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppLayoutModule } from './common/layout/app.layout.module';

import { NotfoundComponent } from './common/notfound/notfound.component';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [ { provide: LocationStrategy, useClass: PathLocationStrategy },MessageService ],
    bootstrap: [AppComponent]
})
export class AppModule {}
