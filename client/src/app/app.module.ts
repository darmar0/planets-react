import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {PlanetsMainComponent} from './planets-main/planets-main.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AvatarModule} from 'ngx-avatar';
import { PlanetsGridComponent } from './planets-main/planets-grid/planets-grid.component';
import { PlanetsTableComponent } from './planets-main/planets-table/planets-table.component';
import { MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { SinglePlanetComponent } from './planets-main/single-planet/single-planet.component';
import { PlanetsDialogComponent } from './planets-main/planets-dialog/planets-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import { PopUpDialogComponent } from './planets-main/pop-up-dialog/pop-up-dialog.component';
import { LoadingComponent } from './loading/loading/loading.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    declarations: [AppComponent, PlanetsMainComponent, PlanetsGridComponent, PlanetsTableComponent, SinglePlanetComponent, PlanetsDialogComponent, PopUpDialogComponent, LoadingComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        AvatarModule,
        MatTableModule,
        MatSortModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
