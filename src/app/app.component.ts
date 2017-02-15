import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { User } from './user';
import { Router, RouterOutlet } from '@angular/router';

//declare var google: any;

declare const FB: any;

@Component({
  moduleId: module.id,
  selector: 'facebook-login',
  templateUrl: './app.component.html',
  // styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {

  location = {};
  setPosition(position: any) {
    this.location = position.coords;
  }

  self: this;
  @Input()
  private user: User = new User();
  @Output()
  public userChangeEvent: EventEmitter<User> = new EventEmitter();
  private accessToken: string;

  constructor(private userService: UserService, private ngZone: NgZone, private storageService: StorageService, private router: Router) {
     this.accessToken = this.storageService.read<string>('accessToken');
   }

  ngOnInit() {
    FB.init({
      appId: '146478719191092',
      status: true,
      cookie: true,
      xfbml: true
    });
    FB.getLoginStatus((response: any) => {
      this.statusChangeCallback(response);
    });
  }

  statusChangeCallback(response: any) {

    if (response.status === 'connected') {
      var accessToken = response.authResponse.accessToken;
      this.storageService.write('accessToken', accessToken);
      console.log('accessToken: ', accessToken);
      this.me();
    } else {
      this.router.navigate(['/']);
      this.login();
    }
  }

  me() {
    var self = this;
    var storageService = this.storageService;
    var router = this.router;
    FB.api('/me', 'GET', { fields: 'email, first_name, name' },
      function(result: any) {
        var fbUser = new User();
        if (result && !result.error) {
          fbUser.name = result.name;
          fbUser.email = result.email;
          fbUser.firstName = result.first_name;
          fbUser.loggedIn = true;
          self.user = fbUser;
          storageService.write('user', fbUser);
          router.navigate(['/userinfo']);
        } else {
          console.log(result.error);
          self.user = new User();
          router.navigate(['/logout']);
        }
        self.userChangeEvent.emit(fbUser);
        self.userChangeEvent.subscribe(fbUser);
      });
  }

  login() {
    var fbUser = new User();
    var self = this;
    var storageService = this.storageService;
    var router = this.router;
    self.userService.getUserChangeEmitter().subscribe(fbUser);
    if (this.user.loggedIn) {
      //logout
      FB.logout((result: any) => {
        fbUser.loggedIn = false;
        fbUser.name = 'Guest';
        fbUser.email = ''
        fbUser.firstName = '';
        storageService.write('user', fbUser);
        router.navigate(['/']);
       self.me();
      });
    } else {
      FB.login((result: any) => {
        if (result.status == 'connected') {
          self.me();
        }
        console.log(result.status);
      }, { scope: 'email, user_likes', return_scopes: true });

    }
  }
}
