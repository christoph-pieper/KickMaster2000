import { UserServiceService } from './../../services/user-service.service';
import { environment } from './../../../environments/environment';
import { User } from './../../entities/user';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  headline = '';

  apiUrl = environment.apiUrl;

  imageRandom = Math.random();
  audioRandom = Math.random();

  constructor(
    public dialogRef: MatDialogRef<ModifyUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public user: User,
    public userService: UserServiceService
  ) {
    if (!user) {
      this.user = new User();
      this.headline = 'Neuen User anlegen';
    } else {
      this.headline = 'Nutzer editieren';
    }
  }

  ngOnInit() {

  }

  onSave() {
    if (this.user._id) {
      this.userService.put(this.user).subscribe( (res) => {
        this.dialogRef.close(res);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.userService.create(this.user).subscribe( (res) => {
        this.dialogRef.close(res);
      }, (err) => {
        console.log(err);
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  imageUploadFinished(xhr) {
    this.imageRandom = Math.random();
  }

  audioUploadFinished(xhr) {
    console.log('finished');
    this.audioRandom = Math.random();
  }

  deleteImage() {
    this.userService.deleteImage(this.user._id).subscribe( (res) => {
      this.imageRandom = Math.random();
    }, (err) => {
      console.log('error');
    });
  }

  deleteAudio() {
    this.userService.deleteAudio(this.user._id).subscribe( (res) => {
      this.audioRandom = Math.random();
    }, (err) => {
      console.log('error');
    });
  }

}
