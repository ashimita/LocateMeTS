import {Component, OnInit} from '@angular/core';
import {RouterModule, Router} from "@angular/router";


declare const FB: any;

@Component({
  selector: 'facebook-login',
  templateUrl: 'facebooklogin.html'
})

export class FacebookLoginComponent implements OnInit {

  constructor() {
    FB.init({
      appId: '146478719191092',
      status: true,
      cookie: true,
      xfbml: true
    });
  }

  onFacebookLoginClick() {
    FB.login();
  }

  // statusChangeCallback(resp) {
  //   if (resp.status === 'connected') {
  //     console.log('connected');
  //   } else if (resp.status === 'not_authorized') {
  //     console.log('not authorized');
  //   } else {
  //     console.log('nothing');
  //   }
  // };
  ngOnInit() {
    console.log('init called');
    // FB.getLoginStatus(response => {
    //   this.statusChangeCallback(response);
    // });
  }
}
