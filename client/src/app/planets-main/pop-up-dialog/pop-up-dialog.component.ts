import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Planet} from "../../model/planet";

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss']
})
export class PopUpDialogComponent implements OnInit {
  planet: Planet;
  constructor( private dialogRef: MatDialogRef<PopUpDialogComponent>,
               @Inject(MAT_DIALOG_DATA) planet: Planet) {
    this.planet = planet;
  }

  ngOnInit(): void {
  }
  confirm(){
    this.dialogRef.close(true);
  }
  cancel(){
    this.dialogRef.close(false);
  }

}
