//import dependencies
import {Finger, FingerCurl, GestureDescription} from 'fingerpose';

//initialize new gesture
export const RockGesture = new GestureDescription('rock');

//define gesture - based on curl and direction (all fingers should be down)

//thumb
RockGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

//index
RockGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);

//middle
RockGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);

//pinky
RockGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

//Ring
RockGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

