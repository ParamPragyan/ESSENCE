/* eslint-disable no-unused-vars */
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import React, { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const TensorFlow = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const interValClearingRef = useRef(null);
  const notificationMessages = [
    {
      title: "Attention Slouch Master!",
      body: "Is that a chair you're sitting on or a marshmallow? Sit up straight, will ya?",
    },
    {
      title: "Gravity Wins Again",
      body: "Nice try, but your slouching game is too strong. How about a posture check?",
    },
    {
      title: "Posture Alert!",
      body: "Your spine just filed a complaint. Think you can give it some support?",
    },
    {
      title: "Slouch Much?",
      body: "I know the floor is fascinating, but your posture could use some work. Sit up!",
    },
    {
      title: "Back to Basics",
      body: "Bent over like a question mark again? Time to straighten up!",
    },
    {
      title: "Lazy Mode: Activated",
      body: "Deactivating lazy mode... Please return to an upright position.",
    },
    {
      title: "Your Spine's Cry for Help",
      body: "Your spine called and said, 'Really?' Give it a break and sit properly.",
    },
    {
      title: "Posture Police",
      body: "Busted! Caught slouching again. Hands up and shoulders back!",
    },
    {
      title: "Not a Shrimp",
      body: "Unless you're auditioning for the role of a shrimp, straighten that back!",
    },
    {
      title: "The Slouch is Real",
      body: "Epic slouch detected. Time to show your chair who's boss and sit up straight!",
    },
  ];

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
  // to show notification
  const showNotification = () => {
    console.log(Notification.permission);
    if (Notification.permission === "granted") {
      let message = notificationMessages[Math.floor(Math.random() * 10)];
      customToast(message.body);
      new Notification(message.title, {
        body: message.body,
        icon: "https://via.placeholder.com/150",
      });
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          message = notificationMessages[Math.floor(Math.random() * 10)];
          customToast(message.body);
          new Notification(message.title, {
            body: message.body,
            icon: "https://via.placeholder.com/150",
          });
        }
      });
    } else {
      alert("Notification permissions denied");
    }
  };
  const customToast = (message) => {
    toast.error(message, {
      className: "text-4xl",
      position: "top-right",
    });
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
      if (pose.score < 0.4) {
        showNotification();
      }
    }
  }
  useEffect(() => {
    runPosnet();

    return () => {
      clearInterval(interValClearingRef.current);
    };
  }, []);

  useEffect(() => {
    // Request permission for notifications
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log(`Notification permission status: ${permission}`);
      });
    }
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
