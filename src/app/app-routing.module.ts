import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { AuthGuard } from './auth.guard';
import { IdeaComponent } from './idea/idea.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PerformanceRiskComponent } from './performance-risk/performance-risk.component';
import { PresentationComponent } from './presentation/presentation.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  { path: '', redirectTo: 'presentation', pathMatch: 'full' },
  { path: 'presentation', component: PresentationComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'timer', component: TimerComponent },
  { path: 'rendimiento-riesgo', component: PerformanceRiskComponent },
  { path: 'ideas', component: IdeaComponent },
  // { path: 'ideas', component: IdeaComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas', component: StatisticsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
