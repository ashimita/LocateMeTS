## LocateMe Application

* This application asks the user to login to his Facebook Account, if he is not logged in already.

* Once logged in, it greets the Facebook user with his first name (as in the Facebook account).

* Below the banner, it displays the current location of the user on a Google Map. It also displays a menu bar on the right.

* The Facebook login/logout button toggles depending on the logged in status of the user.

#### Steps to execute:

* Check out the source code.

* In the index.html, modify the following:

   <script src="https://maps.googleapis.com/maps/api/js?key=<your-api-key>"></script>

* In the app.component.ts, modify the app_id obtained from the facebook https://developers.facebook.com/docs/facebook-login

FB.init({
      appId: '<your_fb_app_id>',
      status: true,
      cookie: true,
      xfbml: true
    });


* On the command line, issue **npm install** and then **npm start** (to start the local server)

  This will open the link in the browser http://localhost:3000/

#### Issue:

There might be an error: Network location provider at 'https://www.googleapis.com/' : Returned error code 403 and the map may not load. This is a problem with the Google Map api.
