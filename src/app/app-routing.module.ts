import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'rollup', loadChildren: () => import('./modules/classification-rollup-demo/classification-rollup-demo/classification-rollup-demo.module').then(m => m.ClassificationRollupDemoModule) }, { path: 'home', loadChildren: () => import('./modules/home/home/home.module').then(m => m.HomeModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
