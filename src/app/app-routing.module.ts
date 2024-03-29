import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'mat-card-internal-scrollbar', loadChildren: () => import('./modules/mat-card-internal-scrollbar/mat-card-internal-scrollbar.module').then(m => m.MatCardInternalScrollbarModule) },
  { path: 'openlayers', loadChildren: () => import('./modules/openlayers-demo/openlayers-demo.module').then(m => m.OpenlayersDemoModule) },
  { path: 'rollup', loadChildren: () => import('./modules/classification-rollup-demo/classification-rollup-demo.module').then(m => m.ClassificationRollupDemoModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
