import { RulesComponent } from './pages/rules/rules.component';
import { UsersComponent } from './pages/users/users.component';
import { MainComponent } from './pages/main/main.component';
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'users', component: UsersComponent },
  { path: 'rules', component: RulesComponent },
  { path: '', pathMatch: 'full', redirectTo: 'main' },
];
