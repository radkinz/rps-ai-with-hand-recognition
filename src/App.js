//import stuff for react app + hand detection
import React, { useRef, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import './App.css';
import { drawHand } from "./utilities";

//import stuff for gesture recognition
import * as fp from "fingerpose";

//import emoji images
import thumbs_up from "./gestureEmojis/thumbs_up.png";
import scissors from "./gestureEmojis/scissors.jpg"
import paper from "./gestureEmojis/paper.png";
import rock from "./gestureEmojis/rock.png";

//import custom gestures
import { PaperGesture } from "./customGestures/paper";
import { RockGesture } from "./customGestures/rock";
import { ScissorsGesture } from "./customGestures/scissors";

//boolean to determine if check gesture
let checkGesture = false;
let Timer;

function App() {
  //define ref
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //use state to alter buttons 
  const [game, setGameState] = useState("Click to Play");

  const FunctionClick = () => {
    function clickHandler() {
      console.log("clicked");
      setGameState("Game loading");
      checkGesture = !checkGesture;
    }

    return (
      <div>
        <button onClick={clickHandler}>{game}</button>
      </div>
    )
  }


  //can use states to connect gesture with emoji
  const [Useremoji, setEmojiUser] = useState(null);
  const [AIemoji, setEmojiAI] = useState(null);

  //for displaying purposes
  const images = { thumbs_up: thumbs_up, paper: paper, rock: rock, scissors: scissors };

  //load handpose
  const runHandpose = async () => {
    const NeuralNet = await handpose.load();

    //loop and detect hands
    setInterval(() => {
      detect(NeuralNet);
    }, 100)
  }

  const detect = async (NeuralNet) => {
    //check if data is availible
    if (typeof webcamRef.current !== "undefined" && //check if webcam undefined
      webcamRef.current !== null && //check webcam null
      webcamRef.current.video.readyState === 4 //check videocam readystate
    ) {
      //get video data
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      //set video height/width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //set canvas height/width to same as video
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //make detection
      const hand = await NeuralNet.estimateHands(video);

      if (hand.length > 0) {
        //import gestures
        const GE = new fp.GestureEstimator([
          fp.Gestures.ThumbsUpGesture,
          PaperGesture,
          RockGesture,
          ScissorsGesture
        ]);

        //estimate  gesture by sending hand and min confidence level
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) { //ensure gesture was detected
          // console.log(gesture.gestures)

          //mapping confidence array
          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );

          //grab max confidence index from the array
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          )

          function getAiGesture() {
            let AIGesture = "rock";
            let randomNum = Math.random();
            if (randomNum < 0.33) {
              AIGesture = "paper";
            }

            if (randomNum > 0.66) {
              AIGesture = "scissors";
            }

            return AIGesture
          }

          function checkWinner(computerMove, playerMove) {

            //first eliminate tie
            if (computerMove === playerMove) {
              return "tie"
            } else {
              if (computerMove === "rock" & playerMove === "paper" || computerMove === "paper" & playerMove === "scissors" || computerMove === "scissors" & playerMove === "rock") {
                return "win"
              } else {
                return "lose"
              }
            }
          }

          function checkGestFunc() {
            //get user's gesture
            let usermove = gesture.gestures[maxConfidence].name;
            console.log(usermove);

            //get AI's gesture
            let AImove = getAiGesture();

            //set AI emoji state
            setEmojiAI(AImove);
            console.log(AImove);

            //determine winner
            console.log(checkWinner(AImove, usermove));

            //change button state
            setGameState("Click to Play");

            checkGesture = false;
            Timer = undefined;
          }

          //get gesture
          //console.log(checkGesture);
          if (checkGesture) {
            console.log(Timer)
            if (Timer === undefined) {
              //print output then turn off check gesture
              Timer = setTimeout(checkGestFunc, 100);
            }
          }

          //set state
          setEmojiUser(gesture.gestures[maxConfidence].name);
        }

      }

      //draw hand mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }

  runHandpose();

  return (
    <div className="App">
      <FunctionClick></FunctionClick>
      <header className="App-header">
        <Webcam ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 648,
            height: 480
          }} />
        <canvas ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 648,
            height: 480
          }} />
        <h2 style={{
          position: "absolute",
          top: 10,
          right: 50
        }}>Your Move</h2>
        <h2 style={{
          position: "absolute",
          top: 10,
          left: 50
        }}>AI's Move</h2>
        {Useremoji !== null ? <img src={images[Useremoji]} alt="gesture" style={{
          position: "absolute",
          top: 100,
          color: "#FFFFFFF",
          right: 50,
          height: 100
        }} /> : ""}
        {AIemoji !== null ? <img src={images[AIemoji]} alt="gesture" style={{
          position: "absolute",
          top: 100,
          left: 50,
          height: 100
        }} /> : ""}
      </header>
    </div>
  );
}

export default App;
