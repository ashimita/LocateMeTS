This code displays your current location on Google Map.

Steps to execute:

Check out the source code.

In the index.html, modify the following:

<script src="https://maps.googleapis.com/maps/api/js?key=<your-api-key>"></script>

On the command line, issue 
npm install 
  followed by 
npm start (to start the local server)

This will open the link in the browser http://localhost:3000/ and would display the map.

Issues:

There might be an error: Network location provider at 'https://www.googleapis.com/' : Returned error code 403 and the map may not load. This is a problem with the Google Map api.
