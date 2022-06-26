import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Planet} from '../../model/planet';
import {PlanetsService} from '../../service/planets.service';
import {ActivatedRoute, Router} from "@angular/router";
import {map, takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-planets-grid',
    templateUrl: './planets-grid.component.html',
    styleUrls: ['./planets-grid.component.scss']
})
export class PlanetsGridComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject();
    planets$: Observable<Planet[]>;
    params;

    constructor(private service: PlanetsService,
                private activated: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.activated.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
            this.planets$ = this.service.getPlanets(params);
        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }
    navigateTo(id){
        this.router.navigate([id]);
    }
}

