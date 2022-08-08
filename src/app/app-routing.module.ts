import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'openlayers', loadChildren: () => import('./modules/openlayers-demo/openlayers-demo.module').then(m => m.OpenlayersDemoModule) },
  { path: 'rollup', loadChildren: () => import('./modules/classification-rollup-demo/classification-rollup-demo.module').then(m => m.ClassificationRollupDemoModule) },
  { path: 'threePanelResizable', loadChildren: () => import('./modules/templates/three-panel-resizable/three-panel-resizable.module').then(m => m.ThreePanelResizableModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
