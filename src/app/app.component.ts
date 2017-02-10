import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

declare var google: any;

declare const FB: any;

@Component({
  moduleId: module.id,
  selector: 'facebook-login',
  templateUrl: 'app.component.html',
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

  constructor(private userService: UserService, private ngZone: NgZone) {}

  ngOnInit() {
this.displayMap();
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
      this.me();
    } else {
      this.login();
    }
  }

  me() {
    var self = this;
    FB.api('/me', 'GET', { fields: 'email, first_name, name' },
      function(result: any) {
        var fbUser = new User();
        if (result && !result.error) {
          fbUser.name = result.name;
          fbUser.email = result.email;
          fbUser.firstName = result.first_name;
          fbUser.loggedIn = true;
          self.user = fbUser;
        } else {
          console.log(result.error);
          self.user = new User();
        }
          self.userChangeEvent.emit(fbUser);
          self.userChangeEvent.subscribe(fbUser);
      });
  }

  login() {
  var fbUser = new User();
  var self = this;
    self.userService.getUserChangeEmitter().subscribe(fbUser);
    if(this.user.loggedIn) {
      //logout
      FB.logout((result: any) => {
        fbUser.loggedIn = false;
        fbUser.name = '';
        fbUser.email = ''
        fbUser.firstName = '';
        self.me();
      });
    } else {
      FB.login((result: any) => {
        if(result.status == 'connected') {
          self.me();
        }
        console.log(result.status);
      }, { scope: 'email, user_likes', return_scopes: true });

    }
  }

  displayMap() {
    if (navigator.geolocation) {

      var map: any;

      var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: true
      };
      map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var c = [position.coords.latitude, position.coords.longitude];
          console.log(position.coords.latitude);
          var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var infowindow = new google.maps.InfoWindow({
            map: map,
            position: geolocate,
            content: '<h1>You are located here!</h1>' +
            '<h2>Lat: ' + position.coords.latitude + '</h2>' +
            '<h2>Long: ' + position.coords.longitude + '</h2>'
          });
          map.setCenter(geolocate);

        },
        (error) => {
          console.log('error', error);
        }
      );
    };
  }
}
