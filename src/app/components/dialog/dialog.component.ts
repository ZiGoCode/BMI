import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { DialogData } from '../home/home.interface';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('dialog', data);

  }

  ngOnInit() {

  }

}
