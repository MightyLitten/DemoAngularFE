import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit{
  
  id?: any;

  constructor(private route: ActivatedRoute, private router: Router,private userService: UserService,private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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
            this.deleteUser();
        }
    });
  }

  deleteUser() {
    this.userService.delete(this.id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });
    this.gotoList();
  }
  gotoList() {
    this.router.navigate(['/users']);
  }
}
