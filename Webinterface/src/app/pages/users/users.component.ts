import { UserServiceService } from 'src/app/services/user-service.service';
import { ModifyUserComponent } from './../../dialogs/modify-user/modify-user.component';
import { environment } from './../../../environments/environment';
import { User } from './../../entities/user';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'audio', 'edit', 'delete'];

  dataSource;

  apiUrl = environment.apiUrl;

  constructor(
    public dialog: MatDialog,
    public userService: UserServiceService,
    public cdr: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit() {
    this.userService.getAll().subscribe( (res) => {
      this.dataSource.data = res;
    }, (err) => {
      console.log(err);
    });
  }

  openModifyUserPopup(user?: User) {
    const dialogRef = this.dialog.open(ModifyUserComponent, {
      width: '650px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (user) {
        user = result;
      } else {
        this.dataSource.data.push(result);
        console.log(this.dataSource.data);
      }
    });
  }

  deleteUser(user: User) {
    this.userService.delete(user).subscribe( (res) => {
      this.dataSource = this.dataSource.data.splice(this.dataSource.data.indexOf(user), 1);
    }, (err) => {
      console.log('error');
    });
  }
}
