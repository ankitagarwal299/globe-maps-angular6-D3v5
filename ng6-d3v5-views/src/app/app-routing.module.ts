import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorldmapComponent } from './components/worldmap/worldmap.component';
import { UsamapComponent } from './components/usamap/usamap.component';

import { EMEAComponent } from './components/emea/emea.component';
import { APACComponent } from './components/apac/apac.component';
import { AmericaContinentComponent } from './components/america-continent/america-continent.component';
import { GlobeContinentsComponent } from './components/globe-continents/globe-continents.component';



const routes: Routes = [
  { path: '',component: GlobeContinentsComponent},
  { 'path': 'world', component: WorldmapComponent },
  { 'path': 'usa', component: UsamapComponent },
  { 'path': 'emea', component: EMEAComponent },
  { 'path': 'apac', component: APACComponent },
  { 'path': 'americaContinent', component: AmericaContinentComponent },
  // { 'path': 'globecontinent', component: GlobeContinentsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
