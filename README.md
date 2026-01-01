# Real-Time Hand Gesture Interface (Rock–Paper–Scissors Demo)

A React + TensorFlow.js demo that detects hand gestures from live webcam video and maps them to discrete intent signals (rock / paper / scissors). The project uses real-time landmark tracking and gesture classification to drive an interactive feedback loop (prediction + game outcome).

## System Overview
**Webcam → Hand Landmarks → Gesture Classification → Intent Output → UI Feedback**

1. **Hand tracking**: TensorFlow.js Handpose detects 21 hand landmarks per frame.
2. **Gesture recognition**: Fingerpose compares landmark geometry against gesture templates.
3. **Interaction loop**: The UI displays the recognized gesture and computes the game outcome.

## Tech Stack
- **React** (UI + webcam loop)
- **TensorFlow.js Handpose** (hand landmark detection)
- **Fingerpose** (gesture classification)

## Model: TensorFlow.js Handpose
TensorFlow.js is a JavaScript ML library that provides pretrained models for the browser. This project uses the Handpose model to estimate hand landmarks from live video:
- https://github.com/tensorflow/tfjs-models/tree/master/handpose

## Gesture Classifier: Fingerpose
Fingerpose uses Handpose landmarks to classify gestures. This repo defines and detects three gestures:
- rock
- paper
- scissors
Documentation:
- https://openbase.com/js/fingerpose/documentation

## Demo Video
https://user-images.githubusercontent.com/81705278/133958419-1186833c-ae29-4d4d-8aac-28ac38f82fcf.mp4

## Running Locally
```bash
npm install
npm start
