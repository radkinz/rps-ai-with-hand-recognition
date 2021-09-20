# A Rock Paper Scissors AI using Gesture Recognition

A react app that tracks your hand and gestures to play rock-paper-scissors with you and detect the outcome of each game.

## TensorFlow.js

[TensorFlow.js](https://www.tensorflow.org/js) is a javascript library that develops many machine learning models. The model that this github repo utlizes is the 
[handpose model](https://github.com/tensorflow/tfjs-models/tree/master/handpose) to track hand and finger movements. 

## Fingerpose

[Fingerpose](https://openbase.com/js/fingerpose/documentation) is a module that utlizes TensorFlow.js's handpose model to detect hand landmarks and run gesture recognition. This module was also used to create three gestures for the program to detect: rock, paper, and scissors. Thus, the program compares the handpose model to each of the three gestures to see if the user makes any valid gesture.

## Demo Video

https://user-images.githubusercontent.com/81705278/133958419-1186833c-ae29-4d4d-8aac-28ac38f82fcf.mp4
