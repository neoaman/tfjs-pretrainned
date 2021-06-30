import React from "react";
import Webcam from "react-webcam";
import { useState } from "react";
import { Grid, IconButton } from "@material-ui/core";
import {
  IoCameraReverse,
  // BiReset,
  // BsChevronRight,
  // BsChevronLeft,
  // BsChevronUp,
  // BsChevronDown,
} from "react-icons/all";
import { useRef } from "react";
// import { useEffect } from "react";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const LiveObjectDetection = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(80);
  const [canvasHeight, setCanvasHeight] = useState(80);

  const videoConstraints = {
    facingMode: FACING_MODE_USER,
  };

  const adjustCanvas = () => {
    console.log("Drawing");
    var Vwidth = webCamRef.current.video.videoWidth;
    var Vheight = webCamRef.current.video.videoHeight;
    var vRatio = Vwidth / Vheight;

    var Sheight = window.screen.height;
    var Swidth = window.screen.width;

    console.log(Sheight * 0.8);
    console.log(Swidth * 0.8);
    console.log(vRatio);
    console.log(vRatio * Sheight);

    var rW = (vRatio * Sheight) / Swidth;
    console.log("Width ratio multiplier", rW);

    var rH = Swidth / (Sheight * vRatio);
    console.log("Height ratio multiplier", rH);

    if (rH < 1) {
      setCanvasHeight((1 / rH) * canvasHeight);
    }
    if (rW < 1) {
      setCanvasWidth(rW * canvasWidth);
    }
  };

  // useEffect(() => {
  //   console.log(webCamRef);
  //   console.log(webCamRef.current.video.videoWidth);
  // }, [webCamRef]);

  return (
    <Grid container justify="center" alignItems="center">
      <IconButton
        onClick={() => {
          setFacingMode((prevState) =>
            prevState === FACING_MODE_USER
              ? FACING_MODE_ENVIRONMENT
              : FACING_MODE_USER
          );
          console.log(facingMode);
          setCanvasWidth(80);
          setCanvasWidth(80);
        }}
        size="small"
        style={{ zIndex: 1260, backgroundColor: "red" }}
      >
        <IoCameraReverse color="white"></IoCameraReverse>
      </IconButton>
      <div
        style={{
          display: "inline-block",
          margin: "0 auto",
          background: "black",
          position: "relative",
        }}
      >
        <Webcam
          onLoadedData={() => adjustCanvas()}
          ref={webCamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
            facingMode,
          }}
          style={{
            position: "absolute",
            width: `${canvasWidth}vw`,
            height: `${canvasHeight}vh`,
            zIndex: 1250,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "relative",
            width: `${canvasWidth}vw`,
            height: `${canvasHeight}vh`,
            zIndex: 1251,
            border: "2px solid green",
          }}
        ></canvas>
      </div>
    </Grid>
  );
};

export default LiveObjectDetection;
