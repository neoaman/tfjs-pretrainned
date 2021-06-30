import React from "react";
import Webcam from "react-webcam";
import { useState } from "react";
import { Grid, IconButton, TextField } from "@material-ui/core";
import {
  IoCameraReverse,
  BsCircleFill,
  VscDebugStart,
  VscDebugStop,
} from "react-icons/all";
import { useRef } from "react";
import { useEffect } from "react";

import "@tensorflow/tfjs";
require("@tensorflow/tfjs-backend-cpu");
const cocoSsd = require("@tensorflow-models/coco-ssd");

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const LiveObjectDetection = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(80);
  const [canvasHeight, setCanvasHeight] = useState(80);
  const [start, setStart] = useState(false);

  const [model, setModel] = useState(null);
  const [bbColor, setBbColor] = useState("white");
  const [bbWidth, setBbWidth] = useState(1);

  const videoConstraints = {
    facingMode: FACING_MODE_USER,
  };

  useEffect(() => {
    const loadModel = async (params) => {
      const model_ = await cocoSsd.load();
      setModel(model_);
    };
    loadModel();
  }, []);

  const adjustCanvas = () => {
    console.log("Drawing");
    var Vwidth = webCamRef.current.video.videoWidth;
    var Vheight = webCamRef.current.video.videoHeight;
    var vRatio = Vwidth / Vheight;

    var Sheight = window.screen.height;
    var Swidth = window.screen.width;

    var rW = (vRatio * Sheight) / Swidth;
    var rH = Swidth / (Sheight * vRatio);

    if (rH < 1) {
      setCanvasHeight((1 / rH) * canvasHeight);
    }
    if (rW < 1) {
      setCanvasWidth(rW * canvasWidth);
    }
  };

  const drawBBox = async () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (start === true) {
      const predVal = await model.detect(webCamRef.current.video);
      // console.log(predVal);
      // ctx.drawImage(
      //   webCamRef.current.video,
      //   0,
      //   0,
      //   canvasRef.current.width,
      //   canvasRef.current.height
      // );

      // Here webcam inputsize and and canvas size are not same
      var rW = webCamRef.current.video.videoWidth / canvasRef.current.width;
      var rH = webCamRef.current.video.videoHeight / canvasRef.current.height;

      ctx.lineWidth = `${bbWidth}`;
      ctx.strokeStyle = `${bbColor}`;
      ctx.fillStyle = `${bbColor}`;
      ctx.beginPath();
      predVal.map((obj) => {
        var [x_, y_, width_, height_] = [...obj["bbox"]];
        var [x, y, width, height] = [
          x_ / rW,
          y_ / rH,
          width_ / rW,
          height_ / rH,
        ];
        ctx.rect(x, y, width, height);
        var score = obj["score"];

        ctx.fillText(obj["class"], x + width / 2, y - 2);
        ctx.fillText(Math.round(score * 100), x, y + height + 8);
        return null;
      });
      // console.log(canvasRef.current.width, canvasRef.current.height);
      ctx.stroke();
    }
    return null;
  };

  return (
    <Grid container justify="flex-start" alignItems="center" direction="row">
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ width: "5vw" }}
      >
        {model !== null ? (
          <IconButton
            onClick={() => setStart(!start)}
            size="small"
            style={{ zIndex: 1260 }}
          >
            {start ? (
              <VscDebugStop color="green"></VscDebugStop>
            ) : (
              <VscDebugStart color="orange"></VscDebugStart>
            )}
          </IconButton>
        ) : (
          "Loading Model....."
        )}

        {start ? (
          ""
        ) : (
          <>
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

            <TextField
              type="number"
              value={bbWidth}
              onChange={(e) => setBbWidth(e.target.value)}
              style={{ width: 35 }}
            ></TextField>

            {["blue", "red", "yellow", "white", "black"].map((c) => (
              <IconButton
                key={c}
                size="small"
                onClick={() => setBbColor(c)}
                style={
                  c === bbColor
                    ? { border: "2px solid black" }
                    : { border: "1px solid gray" }
                }
              >
                <BsCircleFill color={c}></BsCircleFill>
              </IconButton>
            ))}
          </>
        )}
      </Grid>
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
          onProgressCapture={() => drawBBox()}
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
