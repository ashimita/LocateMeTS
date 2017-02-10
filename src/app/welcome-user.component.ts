import { Component, OnInit, NgZone, Input } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

//import { FacebookService } from './facebook.service';
//declare var google: any;


@Component({
  moduleId: module.id,
  selector: 'welcome-user',
  // template: `
  // <div ></div>
  // `
  templateUrl: './welcome-user.component.html'
  // styleUrls: ['app.component.css']
})

export class WelcomeUserComponent implements OnInit {
// TODO: This class should be used for displaying the Welcome screen.
  @Input()
  user: User;
  //self: this;
  promise: Promise<User>;
//  subscription: any;

  constructor(private userService: UserService, private zone: NgZone) {

  //  console.log('Printing user: ', this.user);
  this.userService.getUserChangeEmitter().subscribe(this.user);
//  this.userService.userChangeEvent.subscribe(user => this.data = user);
  }


  // ngOnInit() {
  //  this.userService.getUserChangeEmitter().subscribe(this.user);
  //   console.log(this.user);
  // }

  ngOnInit(){

  }


  // ngOnInit() {
  //   if (navigator.geolocation) {
  //
  //     var map: any;
  //
  //     var mapOptions = {
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP,
  //       fullscreenControl: true
  //     };
  //     map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //
  //         var c = [position.coords.latitude, position.coords.longitude];
  //         console.log(position.coords.latitude);
  //         var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //         var infowindow = new google.maps.InfoWindow({
  //           map: map,
  //           position: geolocate,
  //           content: '<h1>You are located here!</h1>' +
  //           '<h2>Lat: ' + position.coords.latitude + '</h2>' +
  //           '<h2>Long: ' + position.coords.longitude + '</h2>'
  //         });
  //         map.setCenter(geolocate);
  //
  //       },
  //       (error) => {
  //         console.log('error', error);
  //       }
  //     );
  //   };
  // }
}
