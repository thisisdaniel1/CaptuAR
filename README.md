# CaptuAR

INCOMPLETE

First, clone the repo:
git clone ...

To install all the necessary libraries, type:
npm install

Then type:
npm start

OR

npx expo start --tunnel


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