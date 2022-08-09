import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/core/modules/material/material.module';
import { MatCardInternalScrollbarRoutingModule } from './mat-card-internal-scrollbar-routing.module';
import { MatCardInternalScrollbarComponent } from './mat-card-internal-scrollbar.component';

@NgModule({
  declarations: [
    MatCardInternalScrollbarComponent
  ],
  imports: [
    CommonModule,
    MatCardInternalScrollbarRoutingModule,
    MaterialModule
  ]
})
export class MatCardInternalScrollbarModule { }
