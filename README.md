# CaptuAR
--INCOMPLETE--

Firstly, clone the repo to a directory:
`git clone`

# 1. Backend
1. Go to the "backend" directory inside the repo
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to start the server
By default, it should be running on `port 3000`

# 2. ngrok
1. We need ngrok to expose our locally hosted backend, so that our mobile app can connect to it. Make sure you're running the express server (__#1. Backend__).
2. Run `ngrok http 3000` to expose the backend.
3. Copy the url from the "Forwarding" label. We will be needing this in the next step.

# 3. Mobile App
1. Go to the "CaptuAR" directory inside the repo
2. In the `CaptuAR\src\api\tracker.js` file, update the baseURL to be the url that you obtained from (__#2. ngrok__, step 3)
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the expo app
4. Scan the QR code from your phone or run an android emulator.

Main libraries in use (for location):
react-native-maps
expo-location
geolib https://www.npmjs.com/package/geolib
(note that geolib may or may not be needed)

Once you are past the login screen. You will be able move around a map and it will occansionally update your position
Right now we have it set so that you are represented by Daniel's face and for there to be a red circle that you cannot interact with
(Actually the previous update had this feature, now it broken. Roll back if you want to see.)
(Regardless, it is still capturing your coordinates if you open up your console.)

But we were interested in some kind of capture the flag game where players could tag by proximity to other other players
And for a hide and seek game where players could mark where hiders are hiding and see who is caught and who is still playing