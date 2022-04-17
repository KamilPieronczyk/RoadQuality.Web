import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FullPageLoadingComponent } from 'src/app/shared/components/full-page-loading/full-page-loading.component';
import { User } from 'src/app/shared/interfaces/user';
import { ApiService } from './api.service';
import { DomService } from './dom.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUserValue: User | null = null;
  currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  helper = new JwtHelperService();

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private authService: SocialAuthService,
    private domService: DomService
  ) {
    let cookieUser = this.userService.getUser();
    if (cookieUser !== null && !this.helper.isTokenExpired(cookieUser.jwtToken)) {
      this.setUser(cookieUser);
    }
    console.log(cookieUser);
  }

  login(): Promise<any> {
    let cookieUser = this.userService.getUser();
    if (cookieUser === null) {
      return this.loginWithGoogle();
    } else if (this.helper.isTokenExpired(cookieUser.jwtToken)) {
      return this.loginWithGoogle();      
    } else {
      this.setUser(cookieUser);
      return new Promise((res) => {
        return res(cookieUser);
      })
    }
  }
  
  logout() {
    this.currentUserValue = null;
    this.currentUser$.next(null);
    this.userService.removeUser();
  }

  private setUser(user: User) {
    this.currentUserValue = user;
    this.currentUser$.next(user);
    this.userService.saveUser(user);
  }

  private loginWithGoogle() {
    return new Promise((res, rej) => {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x: any) => {
        if (x && x.idToken) {
          FullPageLoadingComponent.show(this.domService);
          this.apiService.post('User/authenticate', {idToken: x.idToken}).subscribe((resp: User) => {
            if(resp.jwtToken !== null) {
              this.setUser(resp);
              FullPageLoadingComponent.hide();
              return res(resp);
            } else {
              FullPageLoadingComponent.hide();
              return rej('Authentication failed');
            }
          }, e => {
            FullPageLoadingComponent.hide();
            return rej(e);
          })
        } else {
          return rej('Google sign in was unsuccessful, please try again');
        }
      }).catch(e => {
        return rej(e);
      });    
    })      
  }

  updateUserProfile(user: User) {
    return this.apiService.post('User/updateUserProfile', user).pipe(tap((user: User) => {
      if(user?.id) {
        const {jwtToken} = this.currentUserValue!;
        user.jwtToken = jwtToken;
        this.setUser(user)
      }
    }));
  }

}
