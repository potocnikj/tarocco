import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Components
 */
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoginGuard } from '../core/guards/login.guard';
import { AuthGuard } from '../core/guards/auth.guard';
/**
 * Guards
 */

const routes: Routes = [
  { path: 'register', canActivate: [LoginGuard], component: RegisterComponent},
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent},
  { path: 'statistics', canActivate: [], component: StatisticsComponent},
  { path: 'scoreboard/:gameId', canActivate: [], component: ScoreboardComponent},
  { path: '**', canActivate: [], component: ScoreboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
