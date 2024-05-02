import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInterceptorService } from './core/services/app-interceptor/app-interceptor.service';
import { CustomRouteReuseStrategy } from './core/utils/custom-route-reuse-strategy';
import { RouteReuseStrategy } from '@angular/router';
// import { AppInterceptorService } from './shared/services/app-interceptor/app-interceptor.service';
// import { SharedModule } from './shared/modules/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  schemas:      [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // SharedModule,
    AppRoutingModule,
 FormsModule, ReactiveFormsModule,
 HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptorService,
    multi: true
    },
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: CustomRouteReuseStrategy,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
