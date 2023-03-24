import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  
  
  displayedColumns: string[] = ['id', 'fullname', 'email', 'gender', 'dob', 'phone', 'address'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.searchUser();
  }

  searchUser(): void {
    this.userService.findByKeyword(this.keyword)
      .subscribe({
        next: (data) => {
          this.users = data;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
        },
        error: (e) => console.error(e)
      });
  }


}
