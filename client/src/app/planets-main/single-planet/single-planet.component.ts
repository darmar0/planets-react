import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {filter, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanetsService} from '../../service/planets.service';
import {Observable, Subject} from 'rxjs';
import {Planet} from '../../model/planet';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlanetsDialogComponent} from '../planets-dialog/planets-dialog.component';
import {PopUpDialogComponent} from "../pop-up-dialog/pop-up-dialog.component";

@Component({
    selector: 'app-single-planet',
    templateUrl: './single-planet.component.html',
    styleUrls: ['./single-planet.component.scss']
})
export class SinglePlanetComponent implements OnInit, OnDestroy {
    planet$: Observable<Planet>;
    destroy$: Subject<boolean> = new Subject();


    constructor(private activated: ActivatedRoute,
                private service: PlanetsService,
                private dialog: MatDialog,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loadPlanet();
    }

    loadPlanet() {
        this.planet$ = this.service.getPlanet(this.activated.snapshot.params.id);

    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    onEditPlanet(planet) {
        this.dialog.open(PlanetsDialogComponent, <MatDialogConfig>{
            data: planet,
            width: '500px',
        }).afterClosed().pipe(
            filter(val => !!val),
            tap(val => this.confirmEdit(val))
        ).subscribe();
    }

    confirmEdit(val) {
        this.dialog.open(PopUpDialogComponent, <MatDialogConfig>{
            data: {mode: 'edit', planet: val},
            width: '400px',
        }).afterClosed().pipe(
            filter(res => !!res),
            tap(res => res ?
                this.editPlanet(val) : null
            )
        ).subscribe();
    }

    editPlanet(val) {
        this.service.editPlanet(this.activated.snapshot.params.id, val).subscribe();
        this.planet$ = this.service.getPlanet(this.activated.snapshot.params.id);
    }


    confirmDelete(planet) {
        this.dialog.open(PopUpDialogComponent, <MatDialogConfig>{
            data: {mode: 'delete', planet: planet},
            width: '400px',
        }).afterClosed().pipe(
            filter(val => !!val),
            tap(val => val ? this.deletePlanet() : null)
        ).subscribe();
    }

    deletePlanet() {
        this.service.deletePlanet(this.activated.snapshot.params.id).subscribe();
        this.router.navigate(['']);

    }

}
