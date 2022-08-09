import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardInternalScrollbarComponent } from './mat-card-internal-scrollbar.component';

const routes: Routes = [{ path: '', component: MatCardInternalScrollbarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatCardInternalScrollbarRoutingModule { }
