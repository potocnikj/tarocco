/**
 * Internal
 */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastyModule } from 'ng2-toasty';
import { NgxChartsModule } from '@swimlane/ngx-charts';
/**
 * Material
 */
import {  MaterialModule } from './material/material.module';
/**
 * Components
 */
import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { GameMenuComponent } from './components/elements/game-menu/game-menu.component';
import { AddRecordComponent } from './components/elements/add-record/add-record.component';
import { AddGameComponent } from './components/elements/add-game/add-game.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { RemoveRoundComponent } from './components/scoreboard/remove-round/remove-round.component';
/**
 * Services
 */
import { DropDownService } from '../core/services/render/dropdown.service';
import { ScoreBoardService } from '../core/services/score-board.service';
import { ModalService } from '../core/services/render/modal.service';
import { HttpService } from '../core/services/http.service';
import { GameService } from '../core/services/game.service';
import { ToastService } from '../core/services/render/toast.service';
import { StepperService } from '../core/services/render/stepper.service';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/elements/search/search.component';
import { AuthenticationService } from '../core/services/authentication.service';
import { TeamService } from '../core/services/team.service';
import { BaseService } from '../core/services/base.service';
/**
 * Pipes
 */
import { RoundPipe } from './pipes/round.pipe';
import { GraphComponent } from './components/elements/graph/graph.component';
import { StatTableComponent } from './components/statistics/stat-table/stat-table.component';
/**
 * Guards
 */
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginGuard } from '../core/guards/login.guard';
import { EndGameComponent } from './components/scoreboard/end-game/end-game.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DetailedViewComponent } from './components/scoreboard/detailed-view/detailed-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    StatisticsComponent,
    GameMenuComponent,
    AddRecordComponent,
    AddGameComponent,
    RemoveRoundComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    RoundPipe,
    GraphComponent,
    StatTableComponent,
    EndGameComponent,
    DetailedViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastyModule,
    NgxChartsModule,
    MaterialModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DropDownService,
    ModalService,
    ScoreBoardService,
    GameService,
    HttpService,
    ToastService,
    StepperService,
    AuthenticationService,
    TeamService,
    AuthGuard,
    LoginGuard,
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
