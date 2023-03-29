import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FreeAPIService } from '../services/free-api.service';
import { Province } from '../models/province';
import { District } from '../models/district';
import { Ward } from '../models/ward';
import { ProvinceService } from '../services/province.service';
import { DistrictService } from '../services/district.service';
import { WardService } from '../services/ward.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

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
  selectedProvince?: Province;
  selectedDistrict?: District;
  Provinces?: Province[];
  Districts?: District[];
  Wards?: Ward[];
  submitted = false;


  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
    private formBuilder: FormBuilder, private dialog: MatDialog, private _FreeAPIService: FreeAPIService,
    private provinceService: ProvinceService, private districtService: DistrictService, private wardService: WardService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
        province: ['', [Validators.required, Validators.pattern("[1-9][0-9]*")]],
        district: ['', [Validators.required, Validators.pattern("[1-9][0-9]*")]],
        ward: ['', [Validators.required, Validators.pattern("[1-9][0-9]*")]],
      },
    );
    this.user.gender = false;
    this.user.province = 0;
    this.user.district = 0;
    this.user.ward = 0;
    this.provinceService.getProvince().subscribe(data => { this.Provinces = data });
    // this._FreeAPIService.getDistrict().subscribe(data => { this.Districts = data });
    // this._FreeAPIService.getWard().subscribe(data => { this.Wards = data });
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getDistrict(){
    this.user.district=0;
    this.user.ward=0;
    this.provinceService.getProvinceByIdAndDistrictList(this.user.province).subscribe(
      data =>{
        this.selectedProvince = data;
        this.Districts = this.selectedProvince?.districts;
      },
    )
  }

  getWard(){
    this.user.ward=0;
    this.districtService.getDistrictByIdAndWardList(this.user.district).subscribe(
      data =>{
        this.selectedDistrict = data;
        this.Wards = this.selectedDistrict?.wards;
      },
    )
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  openDialog(msg: string) {
    
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: msg
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    });
  }

  saveUser(): void {
    const data = {
      email: this.user.email,
      fullname: this.user.fullname,
      gender: this.user.gender,
      dob: this.user.dob,
      phone: this.user.phone,
      province: this.user.province,
      district: this.user.district,
      ward: this.user.ward,
    };

    
    
    this.userService.save(data)
      .subscribe({
        next: (res) => {
          console.log(data);
          this.submitted = true;
          this.gotoList();
        },
        error: (e) => console.log(e.message)
      });

  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}