/* eslint-disable no-unused-vars */
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import React, { useEffect, useRef } from "react";
const TensorFlow = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const interValClearingRef = useRef(null);
  console.log("tensorflow ran");
  const runPosnet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });

    //setInterval
    interValClearingRef.current = setInterval(() => {
      detect(net);
    }, 20000);
  };

  async function detect(net) {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await net.estimateSinglePose(video);

      console.log(pose);
    }
  }
  useEffect(() => {
    runPosnet();

    return () => {
      clearInterval(interValClearingRef.current);
    };
  }, []);
  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 0,
          height: 0,
        }}
      ></Webcam>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 0,
          height: 0,
        }}
      ></canvas>
    </div>
  );
};

export const MemorizedTensorFLow = React.memo(TensorFlow);
