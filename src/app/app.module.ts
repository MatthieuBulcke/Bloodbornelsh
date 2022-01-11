import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { OptionsComponent } from './options/options.component';
import { MainComponent } from './main/main.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { ShopComponent } from './shop/shop.component';
import { FightComponent } from './fight/fight.component';
import { StartComponent } from './start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    OptionsComponent,
    MainComponent,
    WeaponsComponent,
    ShopComponent,
    FightComponent,
    StartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
