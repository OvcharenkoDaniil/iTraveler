import {MatFormFieldModule} from "@angular/material/form-field";

import {Routes,RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from "@auth0/angular-jwt";
import { AppComponent } from './app.component';
import { FlightCardComponent } from './flight/flight-card/flight-card.component';
import { SearchNavBarComponent } from './search-nav-bar/search-nav-bar.component';
import { FlightListComponent } from './flight/flight-list/flight-list.component';
import {TicketService} from "./services/ticket.service";
import { SearchMenuComponent } from './search-menu/search-menu.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { FilterComponent } from './filter/filter.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import { AuthorizationComponent } from './authorization/authorization.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import { MainDataComponent } from './main-data/main-data.component';
import { LoginComponent } from './login/login.component';

import {ACCESS_TOKEN_KEY, AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {AlertifyService} from "./services/alertify.service";
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { AccountComponent } from './account/account.component';
import {MatListModule} from "@angular/material/list";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StartPageComponent } from './start-page/start-page.component';
import { FlightDetailComponent } from './flight/flight-detail/flight-detail.component';
import {DetailResolverService} from "./flight/flight-detail/detail-resolver.service";
import {TabsModule} from "ngx-bootstrap/tabs";


export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}


// MainDataComponent
const appRoutes: Routes = [
  //{path: '', component: AccountComponent},
  {path: '', component: StartPageComponent},
  {path: 'main', component: MainDataComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountComponent},
  {path: 'detail/:id',
    component: FlightDetailComponent,
    resolve: {detailResolver: DetailResolverService}},
  {path: '**', component: MainDataComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    FlightCardComponent,
    SearchNavBarComponent,
    FlightListComponent,
    SearchMenuComponent,
    FilterComponent,
    AuthorizationComponent,
    MainDataComponent,

    LoginComponent,
     FilterPipe,
     SortPipe,
     AccountComponent,
     NavBarComponent,
     StartPageComponent,
     FlightDetailComponent,

  ],

  imports: [
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7138"],
        disallowedRoutes: []
      }
    }),
    MatListModule,
    TabsModule
  ],
  providers: [
    TicketService,
    AlertifyService,
    AuthService,
    UserService,
    DetailResolverService,
    {provide: MAT_DATE_LOCALE, useValue:'ru-RU' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
