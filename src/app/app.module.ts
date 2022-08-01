import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { ClassificationBannerComponent } from './core/components/classification-banner/classification-banner.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { TefaService } from './shared/services/tefa/tefa.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClassificationBannerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    HttpClientModule,
    TefaService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
