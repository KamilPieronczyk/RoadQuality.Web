import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cookieService: CookieService) { }

  saveUser(user: User) {
    this.cookieService.set('user', JSON.stringify(user));
  }

  getUser(): User | null {
    if (this.cookieService.check('user')) {
      let userJson = this.cookieService.get('user');
      return JSON.parse(userJson);
    } else {
      return null;
    }
  }

  removeUser() {
    this.cookieService.delete('user');
  }
}
