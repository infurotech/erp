import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppLayoutModule } from './common/layout/app.layout.module';

import { NotfoundComponent } from './common/notfound/notfound.component';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [ { provide: LocationStrategy, useClass: PathLocationStrategy }, CookieService ],
    bootstrap: [AppComponent],
})
export class AppModule {}
