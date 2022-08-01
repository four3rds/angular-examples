import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenlayersDemoComponent } from './openlayers-demo.component';

const routes: Routes = [{ path: '', component: OpenlayersDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenlayersDemoRoutingModule { }
