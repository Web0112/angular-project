import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import * as jQuery from 'jquery';
import { DataTablesModule } from 'angular-datatables';
import { 
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule, } from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CKEditorModule } from 'ngx-ckeditor';
import { Select2Module } from 'ng2-select2';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { SimpleTimer } from 'ng2-simple-timer';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReportsComponent } from './reports/reports.component';
import { NavPrimaryComponent } from './header/nav-primary/nav-primary.component';
import { NavSecondaryComponent } from './header/nav-secondary/nav-secondary.component';

import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ServerApps } from './config/serverapps.config';
import { MicroService } from './shared/micro.service';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { EventSearchPipe } from './shared/pipes/event-search.pipe';
import { ToastService } from './services/toast.service';
import { NotificationsComponent } from './notifications/list/notifications.component';
import { NotificationCreateComponent } from './notifications/create/notification-creat.component';
import { SettingsContractsComponent } from "./settings/contracts/settings-contracts.component";
import { SettingsPredictionComponent } from "./settings/prediction/settings-prediction.component";
import { SettingsGeneralComponent } from './settings/general/settings-general.component';
import { LeadsRecheckComponent } from './recheck/leadsRecheck/recheck-leadsRecheck.component';
import { HasOffersRecheck } from './recheck/hasOffersRecheck/recheck-hasOffersRecheck.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    EventSearchPipe,
    
    HeaderComponent, FooterComponent,
    NavPrimaryComponent, NavSecondaryComponent,

    ReportsComponent,
    DropdownComponent, 

    PageNotFoundComponent, 
    EventSearchPipe, 
    NotificationsComponent, 
    NotificationCreateComponent, 
    SettingsContractsComponent,
    SettingsPredictionComponent,
    SettingsGeneralComponent,
    LeadsRecheckComponent,
    HasOffersRecheck,
  ],
  imports: [
    BrowserModule, 
    FormsModule, ReactiveFormsModule, HttpClientModule, SnotifyModule, TimezonePickerModule,
    AppRoutingModule, DataTablesModule, 
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
    MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule,
    MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    BrowserAnimationsModule, Select2Module, CKEditorModule,
    NgCircleProgressModule.forRoot({
      radius: 18,
      unitsFontSize: '12',
      titleFontSize: '12',
      showSubtitle: false,
      innerStrokeColor: '#eaeaea',
      outerStrokeWidth: 2,
      innerStrokeWidth: 2,
      space: -2
    }),
    Ng2DragDropModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, 
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults}, SnotifyService, SimpleTimer,
    ServerApps, MicroService, AuthService, AuthGuard, ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }