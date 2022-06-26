import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PlanetsService} from "../service/planets.service";
import {Observable, Subject} from "rxjs";
import {Planet} from "../model/planet";
import {debounceTime, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Route, Router} from "@angular/router";


@Component({
    selector: 'app-planets-main',
    templateUrl: './planets-main.component.html',
    styleUrls: ['./planets-main.component.scss']
})
export class PlanetsMainComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject();
    view: string;
    params;

    constructor(public fb: FormBuilder,
                private service: PlanetsService,
                private activated: ActivatedRoute,
                private router: Router) {
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

        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
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
}


