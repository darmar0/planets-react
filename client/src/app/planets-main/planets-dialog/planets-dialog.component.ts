import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Planet} from '../../model/planet';
import {PlanetsService} from '../../service/planets.service';
import {group} from "@angular/animations";

@Component({
    selector: 'app-planets-dialog',
    templateUrl: './planets-dialog.component.html',
    styleUrls: ['./planets-dialog.component.scss']
})
export class PlanetsDialogComponent implements OnInit {
    planet: Planet;
    form: FormGroup;
    selectedImage: File = null;

    constructor(private fb: FormBuilder,
                private dialogRef: MatDialogRef<PlanetsDialogComponent>,
                private service: PlanetsService,
                @Inject(MAT_DIALOG_DATA) planet: Planet) {
        if (planet) {
            this.planet = planet;
        }

        this.form = fb.group({
            planetName: [planet?.planetName ?? '', Validators.required],
            description: [planet?.description ?? '', Validators.required],
            planetRadiusKM: [planet?.planetRadiusKM ?? '', Validators.required],
            planetColor: [planet?.planetColor ?? '', Validators.required],
            distFromSun: [planet?.distInMillionsKM.fromSun ?? '', Validators.required],
            distFromEarth: [planet?.distInMillionsKM.fromEarth ?? '', Validators.required],
            imageUrl: [''],
            imageName: [''],
            distInMillionsKM: this.fb.group({
                fromSun: [planet?.distInMillionsKM.fromSun ?? '', Validators.required],
                fromEarth: [planet?.distInMillionsKM.fromEarth ?? '', Validators.required],
            }),
        });
    }

    ngOnInit(): void {
    }

    saveChanges() {
        const payload =  this.form.value;
        if (this.planet) {
            console.log(payload)

            this.dialogRef.close(payload);

        } else {
            this.dialogRef.close(payload);

        }

    }

    closeDialog() {
        this.dialogRef.close();
    }

    selectFile($event) {
        this.selectedImage = $event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedImage);
        reader.onload = ((event) => {
            const fragment = `${reader.result}`;
            const file = fragment.split(',')[1];
            console.log(file)
            this.form.patchValue({
                imageUrl: file,
                imageName: this.selectedImage.name,
            });
        });
        // // const fd = new FormData();
        // // fd.append('image', this.selectedImage, this.selectedImage.name);
        // // console.log(fd)
        // this.form.patchValue({
        //     imageUrl: fd,
        //     imageName: this.selectedImage.name,
        // });
    }
}
