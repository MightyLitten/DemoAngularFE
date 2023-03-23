import { Component, OnInit } from '@angular/core';
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
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  
}
