import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Added Difference between HttpModule vs HttpClientModule */
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WorldmapComponent } from './components/worldmap/worldmap.component';
import { UsamapComponent } from './components/usamap/usamap.component';

import { EMEAComponent } from './components/emea/emea.component';
import { APACComponent } from './components/apac/apac.component';
import { AmericaContinentComponent } from './components/america-continent/america-continent.component';
import { GlobeContinentsComponent } from './components/globe-continents/globe-continents.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldmapComponent,
    UsamapComponent,
    EMEAComponent,
    APACComponent,
    AmericaContinentComponent,
    GlobeContinentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
