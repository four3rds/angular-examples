import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/core/modules/material/material.module';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule, // MaterialModule must be imported else styling doesn't work
  ]
})
export class HomeModule { }
