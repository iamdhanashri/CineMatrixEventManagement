import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { MovieManagementComponent } from './movie-management/movie-management.component';
import { ShowManagementComponent } from './show-management/show-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
    MovieManagementComponent,
    ShowManagementComponent
  ],
})
export class AppRoutingModule {}
