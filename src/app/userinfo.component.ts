import { Component, OnInit, NgZone, Input } from '@angular/core';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { User } from './user';

//import { FacebookService } from './facebook.service';
declare var google: any;


@Component({
  moduleId: module.id,
  selector: 'user-info',
  // template: `
  // <div ></div>
  // `
  templateUrl: './userinfo.component.html'
  // styleUrls: ['app.component.css']
})

export class UserInfoComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private storageService: StorageService) {

    this.user = this.storageService.read<User>('user');
    console.log('*** reading user from storage: ', this.user);
  }


  // ngOnInit() {
  //  this.userService.getUserChangeEmitter().subscribe(this.user);
  //   console.log(this.user);
  // }

  ngOnInit(){
   this.displayMap();
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
