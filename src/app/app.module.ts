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

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    OptionsComponent,
    MainComponent,
    WeaponsComponent,
    ShopComponent,
    FightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
