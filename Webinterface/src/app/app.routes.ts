import { MatchmakingComponent } from './pages/matchmaking/matchmaking.component';
import { PokalComponent } from './pages/pokal/pokal.component';
import { RulesComponent } from './pages/rules/rules.component';
import { UsersComponent } from './pages/users/users.component';
import { MainComponent } from './pages/main/main.component';
import { Routes } from '@angular/router';
import { TableComponent } from './pages/table/table.component';

export const AppRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'table', component: TableComponent },
  { path: 'pokal', component: PokalComponent },
  { path: 'users', component: UsersComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'matchmaking', component: MatchmakingComponent },
  { path: '', pathMatch: 'full', redirectTo: 'main' },
];
