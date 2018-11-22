import { UsersComponent } from './pages/users/users.component';
import { MainComponent } from './pages/main/main.component';
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'users', component: UsersComponent },
  { path: '', pathMatch: 'full', redirectTo: 'main' },
];
