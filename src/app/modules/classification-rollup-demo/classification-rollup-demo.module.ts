import { ClassificationRollupDemoRoutingModule } from './classification-rollup-demo-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/core/modules/material/material.module';
import { NgModule } from '@angular/core';

import { ClassificationRollupDemoComponent } from './classification-rollup-demo.component';

@NgModule({
  declarations: [ClassificationRollupDemoComponent],
  imports: [
    ClassificationRollupDemoRoutingModule,
    CommonModule,
    MaterialModule, // MaterialModule must be imported else styling doesn't work
  ],
})
export class ClassificationRollupDemoModule { }
