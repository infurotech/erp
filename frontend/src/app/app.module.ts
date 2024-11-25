import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppLayoutModule } from './common/layout/app.layout.module';

import { NotfoundComponent } from './common/notfound/notfound.component';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [ { provide: LocationStrategy, useClass: PathLocationStrategy } ],
    bootstrap: [AppComponent],
})
export class AppModule {}
