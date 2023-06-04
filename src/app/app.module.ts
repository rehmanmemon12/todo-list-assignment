import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AddUserComponent } from './add-user/add-user.component';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { TabsComponent } from './tabs/tabs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TabComponent } from './tabs/tab.component';
import { UserListComponent } from './users-list/users-list.component';
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddUserComponent,
    TabsComponent,
    TabComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ users: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [UserService, MatDialog, NgxIndexedDBService],
  bootstrap: [AppComponent],
})
export class AppModule {}
