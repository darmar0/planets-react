import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Planet} from '../../model/planet';
import {PlanetsService} from '../../service/planets.service';
import {MatSort} from '@angular/material/sort';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-planets-table',
    templateUrl: './planets-table.component.html',
    styleUrls: ['./planets-table.component.scss']
})
export class PlanetsTableComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject();
    params;
    dataSource: MatTableDataSource<Planet>;
    @ViewChild(MatSort) sort: MatSort;
    @Input() set planets(planets: Planet[]) {
                this.dataSource = new MatTableDataSource(planets);
                this.dataSource.sort = this.sort;
    }
    constructor(private service: PlanetsService,
                private activated: ActivatedRoute,
                private router: Router
    ) {

    }

    displayedColumns: string[] = ['planetName', 'planetColor', 'planetRadiusKM', 'fromSun', 'fromEarth'];

    ngOnInit(): void {

    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    navigateTo(id) {
        this.router.navigate([id]);
    }
}
