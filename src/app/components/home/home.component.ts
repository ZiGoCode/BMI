import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EditComponent } from '../edit/edit.component';
import { PeriodicElement } from './home.interface';
import { ServiceService } from 'src/app/service.service';

// export interface DialogData {
//   animal: string;
//   name: string;
// }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  angForm: FormGroup;
  bmi: any;
  color: string;
  mname: string
  type: string;
  name: string;
  newBMI: any;

  displayedColumns: string[] = ['name', 'weight', 'symbol', 'bmi', 'button'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private sbmi: ServiceService) {
    this.createForm();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  createForm() {
    this.angForm = this.fb.group({
      position: [''],
      bmi: [''],
      name: [''],
      color: [''],
      wight: ['', Validators.required],
      height: ['', Validators.required]
    });
  }
  // onClick() {
  //   if (!this.angForm.invalid) {
  //     var h = this.angForm.value.height / 100;
  //     var price = this.angForm.value.wight / (h * h)
  //     this.bmi = price.toFixed(2);
  //   }
  // }
  onClickSubmit() {
    if (!this.angForm.invalid) {
      var h = this.angForm.value.height / 100;
      var price = this.angForm.value.wight / (h * h)
      this.bmi = price.toFixed(2);
      this.angForm.controls['bmi'].setValue(this.bmi);
      this.angForm.controls['position'].setValue(ELEMENT_DATA.length + 1);

      this.newBMI = this.sbmi.compute(this.angForm.value.wight, h, this.bmi);
      console.log("BMI", this.newBMI);

      if (this.bmi < 18.5) {
        this.type = 'น้ำหนักน้อยมาตรฐาน';
        this.angForm.controls['color'].setValue('brown');
      }
      else if (this.bmi >= 18.5 && this.bmi <= 22.9) {
        this.type = 'ปกติ';
        this.angForm.controls['color'].setValue('green');
      }
      else if (this.bmi > 23 && this.bmi <= 24.9) {
        this.type = 'อ้วนระดับ 1';
        this.angForm.controls['color'].setValue('aqua');

      }
      else if (this.bmi > 25 && this.bmi <= 29.9) {
        this.type = 'อ้วนระดับ 2';
        this.angForm.controls['color'].setValue('blue');
      }
      else if (this.bmi > 30) {
        this.type = 'อ้วนระดับ 3';
        this.angForm.controls['color'].setValue('blue');
      }
      ELEMENT_DATA.push(this.angForm.value);
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

      const dialogRef = this.dialog.open(DialogComponent, {
        width: '450px',
        data: { name: this.angForm.value.name, type: this.type, bmi: this.bmi, newBMI: this.newBMI }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
      this.angForm.setValue({
        position: [''],
        bmi: [''],
        color: [''],
        name: ['', Validators.required],
        wight: ['', Validators.required],
        height: ['', Validators.required]
      });
      this.mname = null;
    }

  }

  clickPosition(position: number) {
    console.log(position);
    const dataBMI = ELEMENT_DATA.find(user => user.position == position);
    const dialogRef = this.dialog.open(EditComponent, {
      width: '450px',
      data: { name: dataBMI.name, wight: dataBMI.wight, height: dataBMI.height }
    });

    dialogRef.afterClosed().subscribe(result => {
      return new Promise((resolve, reject) => {
        var h = result.height / 100;
        var price = result.wight / (h * h)
        var nbmi = price.toFixed(2);
        dataBMI.name = result.name;
        dataBMI.wight = result.wight;
        dataBMI.height = result.height;
        dataBMI.bmi = Number(nbmi);
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      })

    });
  }

  clickDelete(position: number) {
    for (let index = 0; index < ELEMENT_DATA.length; index++) {
      if (ELEMENT_DATA[index]["position"] == position) {
        ELEMENT_DATA.splice(index, 1);
      }
    }
    // delete ELEMENT_DATA[position-1];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  }


}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   wight: number;
//   height: number;
//   bmi: number;
// }

const ELEMENT_DATA: PeriodicElement[] = [

];