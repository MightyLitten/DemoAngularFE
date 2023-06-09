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
  Wards!: Ward[];
  EmptyWards?: Ward[];
  selectedWard?: any;
  submitted = false;
  currentProvince?: any;
  currentDistrict?: any;
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

    this.id = this.route.snapshot.params['id'];
    this.getUser();
    this.getProvince();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getUser() {
    this.userService.get(this.id).subscribe(data => {
      this.user = data;
      this.currentProvince = this.user.province;
      this.currentDistrict = this.user.district;
      console.log(this.user);
    });
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

  getProvince() {
    this._FreeAPIService.getProvince().subscribe(data => {
      this.Provinces = data;
      this.getDistrict();
    });
  }

  getDistrict() {
    if(this.user.province != this.currentProvince){
      this.user.district = 0;
      this.user.ward = 0;
      this.currentProvince = this.user.province;
    }
    this._FreeAPIService.getProvinceByIdAndDistrictList(this.user.province).subscribe(
      data => {
        this.selectedProvince = data;
        this.Districts = this.selectedProvince?.districts;
        this.getWard();
      },
    )
  }

  getWard() {
    if(this.user.district != this.currentDistrict){
      this.user.ward = 0;
      this.currentDistrict = this.user.district;
    }
    this._FreeAPIService.getDistrictByIdAndWardList(this.user.district).subscribe(
      data => {
        this.selectedDistrict = data;
        this.Wards = this.selectedDistrict?.wards;
      },
    )
  }

  updateUser() {
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




