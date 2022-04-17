import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth-checker',
  templateUrl: './auth-checker.component.html',
  styleUrls: ['./auth-checker.component.scss']
})
export class AuthCheckerComponent implements OnInit {

  isUserLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isUserLoggedIn = !!user;
    })
  }

}
