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
export class PlanetsGridComponent implements OnInit {
    params;
    @Input() planets: Planet[] = [];
    constructor(private service: PlanetsService,
                private activated: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    navigateTo(id){
        this.router.navigate([id]);
    }
}

