import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

//const routes: Routes = [];
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Dashboard' },
  {
    path: 'Dashboard', component: DashboardComponent
  , data: {}
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
