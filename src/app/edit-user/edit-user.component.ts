import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { District } from '../models/district';
import { Province } from '../models/province';
import { Ward } from '../models/ward';
import { FreeAPIService } from '../services/free-api.service';
import { DistrictService } from '../services/district.service';
import { ProvinceService } from '../services/province.service';
import { WardService } from '../services/ward.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id?: any;
  gender?: any;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    fullname: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    phone: new FormControl(''),
    province: new FormControl(''),
    district: new FormControl(''),
    ward: new FormControl(''),
  });

  user: User = {
    email: '',
    fullname: '',
    gender: '',
    dob: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
  };
  Provinces?: Province[];
  selectedProvince?: any;
  Districts?: District[];
  selectedDistrict?: any;
  Wards?: Ward[];
  selectedWard?: any;
  submitted = false;

  message = '';

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
    private dialog: MatDialog, private formBuilder: FormBuilder, private _FreeAPIService: FreeAPIService,
    private provinceService: ProvinceService, private districtService: DistrictService, private wardService: WardService,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
        province: ['', [Validators.required]],
        district: ['', [Validators.required]],
        ward: ['', [Validators.required]],
      },
    );
    this._FreeAPIService.getProvince().subscribe(data => { this.Provinces = data });
    this._FreeAPIService.getDistrict().subscribe(data => { this.Districts = data });
    this._FreeAPIService.getWard().subscribe(data => { this.Wards = data });
    this.id = this.route.snapshot.params['id'];
    this.userService.get(this.id).subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Do you want to save this edit?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.updateUser();
      }
    });
  }

  updateUser() {
    this._FreeAPIService.getProvinceById(this.user.province).subscribe(data => {
       this.provinceService.save(data)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (e) => console.log(e)
      })
      });
    this._FreeAPIService.getDistrictById(this.user.district).subscribe(data => { 
      console.log(data);
      this.districtService.save(data)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (e) => console.log(e)
      })
     });
    this._FreeAPIService.getWardById(this.user.ward).subscribe(data => {
      console.log(data); 
      this.wardService.save(data)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (e) => console.log(e)
      }) 
    });
    

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.userService.update(this.id, this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.gotoList();
      },
      error: (e) => console.log(e)
    });
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}




