import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlanetsMainComponent} from './planets-main/planets-main.component';
import {SinglePlanetComponent} from "./planets-main/single-planet/single-planet.component";


const routes: Routes = [{path: '', component: PlanetsMainComponent},
    {path: ':id', component: SinglePlanetComponent}];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
