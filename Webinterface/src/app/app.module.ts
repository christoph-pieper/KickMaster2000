import { environment } from './../environments/environment.prod';
import { SeasonsService } from './services/seasons.service';
import { LiveService } from './services/websocket/live.service';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { MainComponent } from './pages/main/main.component';
import { AppRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FileUploadModule} from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatCardModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatTabsModule,
  MatExpansionModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { UsersComponent } from './pages/users/users.component';
import { ModifyUserComponent } from './dialogs/modify-user/modify-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './services/user-service.service';
import { LiveViewComponent } from './layout/live-view/live-view.component';
import { WebsocketService } from './services/websocket/websocket.service';

// import { SocketIoModule, SocketIoConfig } from 'ng6-socket-io';
import { RulesComponent } from './pages/rules/rules.component';
import { MomentModule } from 'ngx-moment';
import { PokalComponent } from './pages/pokal/pokal.component';
import { TableComponent } from './pages/table/table.component';
import { TableService } from './services/table.service';
import { TableMatchesComponent } from './pages/table/matches/matches.component';
import { TableTableComponent } from './pages/table/table/table.component';
import { MatchComponent } from './shared/match/match.component';
import { MatchmakingComponent } from './pages/matchmaking/matchmaking.component';
import { ModifySeasonComponent } from './dialogs/modify-season/modify-season.component';
import { SeasontableComponent } from './pages/matchmaking/seasontable/seasontable.component';

import * as $ from 'jquery';

window["$"] = $;
window["jQuery"] = $;
// import 'jquery-bracket';
import 'bootstrap-daterangepicker';

// const config: SocketIoConfig = { url: environment.wsUrl, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    SidenavComponent,
    ModifyUserComponent,
    LiveViewComponent,
    RulesComponent,
    PokalComponent,
    TableComponent,
    TableTableComponent,
    TableMatchesComponent,
    MatchComponent,
    MatchmakingComponent,
    ModifySeasonComponent,
    SeasontableComponent
  ],
  imports: [
    RouterModule.forRoot(
      AppRoutes // <-- debugging purposes only
    ),
    // SocketIoModule.forRoot(config),
    BrowserModule,
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    MatTooltipModule,
    MomentModule
  ],
  providers: [
    UserServiceService,
    TableService,
    LiveService,
    WebsocketService,
    SeasonsService
  ],
  entryComponents: [
    ModifyUserComponent,
    ModifySeasonComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
