import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./services/auth-guard.service";
import { LoginComponent } from "./login/login.component";
import { ReportsComponent } from "./reports/reports.component";
import { NotificationsComponent } from "./notifications/list/notifications.component";
import { NotificationCreateComponent } from "./notifications/create/notification-creat.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SettingsContractsComponent } from "./settings/contracts/settings-contracts.component";
import { SettingsPredictionComponent } from './settings/prediction/settings-prediction.component';
import { SettingsGeneralComponent } from './settings/general/settings-general.component';
import { LeadsRecheckComponent } from "./recheck/leadsRecheck/recheck-leadsRecheck.component";
import { HasOffersRecheck } from './recheck/hasOffersRecheck/recheck-hasOffersRecheck.component';


const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
    {path: 'notfound', component: PageNotFoundComponent, canActivate: [AuthGuard]},

    {path: 'notifications/list', component: NotificationsComponent, canActivate: [AuthGuard]},
    {path: 'notifications/create', component: NotificationCreateComponent, canActivate: [AuthGuard]},
    {path: 'notification/:uuid', component: NotificationCreateComponent, canActivate: [AuthGuard]},
    {path: 'settings/contracts', component: SettingsContractsComponent, canActivate: [AuthGuard]},
    {path: 'settings/predictions', component: SettingsPredictionComponent, canActivate: [AuthGuard]},
    {path: 'settings/general', component: SettingsGeneralComponent, canActivate: [AuthGuard]},
    {path: 'recheck/leadsRecheck', component: LeadsRecheckComponent, canActivate: [AuthGuard]},
    {path: 'recheck/hasOffersRecheck', component: HasOffersRecheck, canActivate: [AuthGuard]},
  
    //SHOULD BE LAST ONEONE
    {path: '**', redirectTo: '/notfound'},
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})], 
    exports: [RouterModule]
})
export class AppRoutingModule {

}