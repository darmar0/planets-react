import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Planet} from '../../model/planet';
import {PlanetsService} from '../../service/planets.service';

@Component({
    selector: 'app-planets-dialog',
    templateUrl: './planets-dialog.component.html',
    styleUrls: ['./planets-dialog.component.scss']
})
export class PlanetsDialogComponent implements OnInit {
    planet: Planet;
    form: FormGroup;

    constructor(private fb: FormBuilder,
                private dialogRef: MatDialogRef<PlanetsDialogComponent>,
                private servis: PlanetsService,
                @Inject(MAT_DIALOG_DATA) planet: Planet) {
        this.planet = planet;

        this.form = fb.group({
            planetName: [planet.planetName, Validators.required],
            description: [planet.description, Validators.required],
            radiusKm: [planet.planetRadiusKM, Validators.required],
            planetColor: [planet.planetColor, Validators.required],
            distFromSun: [planet.distInMillionsKM.fromSun, Validators.required],
            distFromEarth: [planet.distInMillionsKM.fromEarth, Validators.required]

        });
    }

    ngOnInit(): void {
    }

    saveChanges() {
        const payload = this.form.value;
        this.servis.editPlanet(this.planet.id, payload).subscribe(res => {
            this.dialogRef.close(res);
        });
    }

}
