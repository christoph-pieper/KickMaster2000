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
  MatToolbarModule
} from '@angular/material';
import { UsersComponent } from './pages/users/users.component';
import { ModifyUserComponent } from './dialogs/modify-user/modify-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './services/user-service.service';
import { LiveViewComponent } from './layout/live-view/live-view.component';
import { WebsocketService } from './services/websocket/websocket.service';

import { SocketIoModule, SocketIoConfig } from 'ng6-socket-io';
import { environment } from 'src/environments/environment';
import { RulesComponent } from './pages/rules/rules.component';
import { MomentModule } from 'ngx-moment';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    SidenavComponent,
    ModifyUserComponent,
    LiveViewComponent,
    RulesComponent
  ],
  imports: [
    RouterModule.forRoot(
      AppRoutes // <-- debugging purposes only
    ),
    SocketIoModule.forRoot(config),
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
    MomentModule
  ],
  providers: [
    UserServiceService,
    LiveService,
    WebsocketService
  ],
  entryComponents: [
    ModifyUserComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
