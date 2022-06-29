import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PlanetsService} from '../service/planets.service';
import {Observable, Subject} from 'rxjs';
import {Planet} from '../model/planet';
import {debounceTime, filter, finalize, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlanetsDialogComponent} from './planets-dialog/planets-dialog.component';
import {PopUpDialogComponent} from './pop-up-dialog/pop-up-dialog.component';
import {LoadingService} from '../loading/loading/loading.service';


@Component({
    selector: 'app-planets-main',
    templateUrl: './planets-main.component.html',
    styleUrls: ['./planets-main.component.scss']
})
export class PlanetsMainComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject();
    view: string;
    params;
    planets$: Observable<Planet[]>;

    constructor(public fb: FormBuilder,
                private service: PlanetsService,
                private activated: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog,
                private loadingService: LoadingService) {
    }

    searchForm = this.fb.group({
        search: this.fb.control(''),
    });

    ngOnInit(): void {
        this.loadingService.loadingOn();
        this.view = 'grid';
        this.formSubsrcibe();
        this.activated.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
            this.setParams(params);
            if (Object.keys(params).length >= 1) {
                this.searchForm.get('search').setValue(params.search);
            }
            this.loadPlanets(params);
        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    loadPlanets(params) {
        const loadingPlanets$ = this.service.getPlanets(params);
        this.planets$ = this.loadingService.showLoaderUntilCompleted(loadingPlanets$);
    }

    formSubsrcibe() {
        this.searchForm.get('search').valueChanges.pipe(debounceTime(500)).subscribe(r => {
            this.params.search = r;
            this.changeParams();
        });
    }

    changeView(view: string) {
        this.view = view;
    }

    changeParams() {
        this.router.navigate([], {
            relativeTo: this.activated,
            queryParams: this.params
        });
    }

    setParams(params) {
        this.params = {
            search: params.search ? params.search : '',
        };
    }

    onCreatePlanet() {
        this.dialog.open(PlanetsDialogComponent, {
            width: '500px',
        } as MatDialogConfig).afterClosed().pipe(
            filter(val => !!val),
            tap(val => this.confirmCreate(val))
        ).subscribe();
    }

    confirmCreate(val) {
        this.dialog.open(PopUpDialogComponent, {
            data: {mode: 'create', planet: val},
            width: '400px',
        } as MatDialogConfig).afterClosed().pipe(
            filter(res => !!res),
            tap(res => res ?
                this.createPlanet(val) : null
            )
        ).subscribe();
    }

    createPlanet(val) {
        this.service.createPlanet(val).subscribe();
        this.loadPlanets({});
    }
}


