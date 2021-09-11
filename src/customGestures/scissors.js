//import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

//initialize new gesture
export const ScissorsGesture = new GestureDescription('scissors');

//define gesture - based on curl and direction (only two fingers should be up like a peace sign)

//thumb
ScissorsGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

//index
ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ScissorsGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//middle
ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
ScissorsGesture.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//pinky
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

//Ring
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

