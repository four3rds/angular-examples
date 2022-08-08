import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/core/modules/material/material.module';
import { ThreePanelResizableRoutingModule } from './three-panel-resizable-routing.module';
import { ThreePanelResizableComponent } from './three-panel-resizable.component';


@NgModule({
  declarations: [
    ThreePanelResizableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ThreePanelResizableRoutingModule
  ]
})
export class ThreePanelResizableModule { }
