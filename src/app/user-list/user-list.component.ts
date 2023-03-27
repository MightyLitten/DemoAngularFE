import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { District } from '../models/district';
import { Province } from '../models/province';
import { User } from '../models/user';
import { Ward } from '../models/ward';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  Provinces?: Province[];
  Districts?: District[];
  Wards?: Ward[];
  keyword = '';
  basicSelectedOption: number = 5;
  p: any = 1;
  province?: Province;
  id?: any;
  
  
  displayedColumns: string[] = ['id', 'fullname', 'email', 'gender', 'dob', 'phone', 'address'];
  dataSource!: MatTableDataSource<User>;

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.searchUser();
  }

  searchUser(): void {
    this.userService.findByKeyword(this.keyword)
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(id: any){
    this.userService.delete(id)
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.searchUser();
      },
      error: (e) => console.error(e)
    }
    )
  }

  delete(id: any){
    this.id = id;
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
    data:{
        message: 'Do you want to delete this user?'
    }
    });
     
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
            this.deleteUser(this.id);
        }
    });
  }

}
