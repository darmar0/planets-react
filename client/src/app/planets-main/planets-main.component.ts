import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PlanetsService} from "../service/planets.service";
import {Observable, Subject} from "rxjs";
import {Planet} from "../model/planet";
import {debounceTime, filter, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PlanetsDialogComponent} from "./planets-dialog/planets-dialog.component";
import {PopUpDialogComponent} from "./pop-up-dialog/pop-up-dialog.component";


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
    @Output() planetsChanged = new EventEmitter();

    constructor(public fb: FormBuilder,
                private service: PlanetsService,
                private activated: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog) {
    }

    searchForm = this.fb.group({
        search: this.fb.control(''),
    });

    ngOnInit(): void {
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
        this.planets$ = this.service.getPlanets(params);
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
        this.dialog.open(PlanetsDialogComponent, <MatDialogConfig>{
            width: '500px',
        }).afterClosed().pipe(
            filter(val => !!val),
            tap(val => this.confirmCreate(val))
        ).subscribe();
    }

    confirmCreate(val) {
        this.dialog.open(PopUpDialogComponent, <MatDialogConfig>{
            data: {mode: 'create', planet: val},
            width: '400px',
        }).afterClosed().pipe(
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


