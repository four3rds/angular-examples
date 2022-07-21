import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationRollupDemoComponent } from './classification-rollup-demo.component';

const routes: Routes = [{ path: '', component: ClassificationRollupDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificationRollupDemoRoutingModule { }
