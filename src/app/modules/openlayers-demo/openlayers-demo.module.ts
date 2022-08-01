import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/core/modules/material/material.module';
import { OpenlayersDemoRoutingModule } from './openlayers-demo-routing.module';
import { OpenlayersDemoComponent } from './openlayers-demo.component';
import { OpenlayersComponent } from '@app/shared/components/openlayers/openlayers.component';

@NgModule({
  declarations: [
    OpenlayersComponent,
    OpenlayersDemoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    OpenlayersDemoRoutingModule
  ]
})
export class OpenlayersDemoModule { }
