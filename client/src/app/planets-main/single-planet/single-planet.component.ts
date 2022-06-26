import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {filter, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {PlanetsService} from '../../service/planets.service';
import {Observable, Subject} from 'rxjs';
import {Planet} from '../../model/planet';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlanetsDialogComponent} from '../planets-dialog/planets-dialog.component';

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
                private dialog: MatDialog) {
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

    // tslint:disable-next-line:typedef
    editPlanet(planet) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '500px';
        dialogConfig.data = planet;

        const dialogRef = this.dialog.open(PlanetsDialogComponent, dialogConfig);

        dialogRef.afterClosed().pipe(
            filter(val => !!val),
            tap(val => this.planet$ = this.service.getPlanet(this.activated.snapshot.params.id))
        ).subscribe();
    }
}
