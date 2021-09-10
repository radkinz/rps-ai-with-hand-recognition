//import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

//initialize new gesture
export const PaperGesture = new GestureDescription('paper');

//define gesture - based on curl and direction (all fingers should be up)

//thumb
PaperGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
PaperGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
PaperGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25)

//index
PaperGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
PaperGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.75);

//middle
PaperGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
PaperGesture.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.75);

//pinky
PaperGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
PaperGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.75);

//Ring
PaperGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
PaperGesture.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.75);

