import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorizationGuard } from './auth-guards/authorization-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthorizationGuard],
    component: HomeComponent
  }
];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
