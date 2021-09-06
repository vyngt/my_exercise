import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, FormGroup } from "reactstrap";
import { useAppDispatch } from "../../app/hooks";
import "./face.scss";

const FaceID: React.FC<{
  action: ActionCreatorWithPayload<string, string>;
}> = ({ action }) => {
  const videoHeight = 480;
  const videoWidth = 640;
  const [isCapture, setIsCapture] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const img = new Image();

  const dispatch = useAppDispatch();

  useEffect(() => {
    startVideo();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current !== null) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("fail" + err));
  };

  const offVideo = () => {
    if (videoRef.current !== null) {
      const stream: any = videoRef.current.srcObject;
      if (stream !== null) {
        const tracks = stream.getTracks();

        tracks.forEach((track: any) => {
          track.stop();
        });
      }
      videoRef.current.srcObject = null;
    }
  };

  const handleOnClick = (
    action: ActionCreatorWithPayload<string, string>,
    dispatch: any
  ) => {
    if (canvasRef.current !== null && videoRef.current !== null) {
      const context = canvasRef.current.getContext("2d");
      if (context !== null) {
        context.clearRect(0, 0, videoWidth, videoHeight);
        context.drawImage(videoRef.current, 0, 0);
        img.src = canvasRef.current.toDataURL();
        setIsCapture(false);
        offVideo();
        dispatch(action(img.src));
      }
    }
  };

  const reCapture = () => {
    startVideo();
    if (canvasRef.current !== null) {
      const context = canvasRef.current.getContext("2d");
      if (context !== null) {
        context.clearRect(0, 0, videoWidth, videoHeight);
        setIsCapture(true);
      }
    }
  };

  return (
    <Container>
      <div className="display-flex">
        <video
          ref={videoRef}
          autoPlay
          muted
          height={videoHeight}
          width={videoWidth}
        />
        <canvas
          className="position-absolute"
          ref={canvasRef}
          height={videoHeight}
          width={videoWidth}
        />
      </div>
      <FormGroup>
        {isCapture ? (
          <Button type="button" onClick={() => handleOnClick(action, dispatch)}>
            Capture
          </Button>
        ) : (
          <Button type="button" onClick={reCapture}>
            Re-Capture
          </Button>
        )}
        {/* <Button type="button">Upload</Button> */}
      </FormGroup>
    </Container>
  );
};

export default FaceID;
