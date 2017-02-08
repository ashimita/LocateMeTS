import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  location = {};
  setPosition(position: any) {
    this.location = position.coords;

  }
  ngOnInit() {
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
