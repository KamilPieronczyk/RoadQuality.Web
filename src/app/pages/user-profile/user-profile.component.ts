import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;
  form: FormGroup; 
  saving = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = this.authService.currentUserValue!;
    this.form = new FormGroup({
      firstName: new FormControl(this.user.name),
      lastName: new FormControl(this.user.lastName),
      email: new FormControl(this.user.email),
      phoneNumber: new FormControl(this.user.phoneNumber)
    });
    this.form.get('email')!.disable();
  }

  ngOnInit(): void {
    
  }

  submit() {
    if(this.saving) return;
    let values = this.form.getRawValue();
    let user: User = {
      lastName: values.lastName,
      name: values.firstName,
      phoneNumber: values.phoneNumber 
    } as User;
    this.saving = true;
    this.authService.updateUserProfile(user).subscribe(user => {
      this.saving = false;
      this.router.navigate(['/profile']);
    })
  }

}
