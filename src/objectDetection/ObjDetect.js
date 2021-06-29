import React from "react";
import { Grid, Typography, TextField, IconButton } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { BiChip } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { useRef } from "react";

require("@tensorflow/tfjs-backend-cpu");
const cocoSsd = require("@tensorflow-models/coco-ssd");

const ObjDetect = () => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [imhUrl, setImhUrl] = useState("/static/streetRandom.jpg");
  const [predVal, setPredVal] = useState(null);
  const [model, setModel] = useState(null);
  const [dim, setDim] = useState(null);
  const [bbColor, setBbColor] = useState("white");
  const [bbWidth] = useState("1");

  useEffect(() => {
    const loadModel = async (params) => {
      const model_ = await cocoSsd.load();
      setModel(model_);
    };
    loadModel();
  }, []);

  const drawCanvas = () => {
    var width = imgRef.current.width;
    var height = imgRef.current.height;
    setDim([width, height]);
    canvasRef.current.height = height;
    canvasRef.current.width = width;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(imgRef.current, 0, 0, width, height);
  };

  const predict = async (params) => {
    if (model !== null) {
      const predictions = await model.detect(imgRef.current);
      console.log(predictions);
      setPredVal(predictions);
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(imgRef.current, 0, 0, dim[0], dim[1]);
      drawBBox(predictions);
    }
  };

  useEffect(() => {
    if (predVal !== null) {
      console.log(bbColor, bbWidth);
      drawBBox(predVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bbColor, bbWidth]);

  const drawBBox = (predVal) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = `${bbWidth}`;
    ctx.strokeStyle = `${bbColor}`;
    ctx.fillStyle = `${bbColor}`;
    ctx.beginPath();
    predVal.map((obj) => {
      ctx.rect(...obj["bbox"]);
      var [x, y, width, height] = [...obj["bbox"]];
      var score = obj["score"];
      ctx.fillText(obj["class"], x + width / 2, y - 2);
      ctx.fillText(Math.round(score * 100), x, y + height + 8);
      return null;
    });
    ctx.stroke();
    return null;
  };

  return (
    <Grid container justify="center" alignItems="center" direction="row">
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ maxWidth: "40%", maxHeight: "80vh" }}
      >
        <img
          src={imhUrl}
          alt="Input"
          ref={imgRef}
          onLoad={() => drawCanvas()}
          crossOrigin="anonymous"
          style={{ maxHeight: "80vh", maxWidth: "100%" }}
        />
        <TextField
          value={imhUrl}
          style={{ width: "100%" }}
          onChange={(e) => {
            setImhUrl(e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid
        container
        style={{ maxWidth: "5%" }}
        justify="center"
        alignItems="center"
        direction="column"
      >
        {model === null ? (
          <Grid container item align="center" justify="center">
            <BiChip className="App-logo" size="40" color="steelblue"></BiChip>
          </Grid>
        ) : (
          <IconButton onClick={() => predict()}>
            <AiOutlineDoubleRight></AiOutlineDoubleRight>
          </IconButton>
        )}
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ maxWidth: "40%", maxHeight: "70vh" }}
      >
        <canvas
          alt="Input Image"
          ref={canvasRef}
          width={dim ? dim[0] : 10}
          height={dim ? dim[1] : 10}
        />

        <Grid container justify="center" alignItems="center" direction="row">
          <Typography
            align="center"
            style={{
              borderBlock: "1px solid green",
              marginBlock: 3,
            }}
          >
            Output Image
          </Typography>
          {["blue", "red", "yellow", "white", "black"].map((c) => (
            <IconButton
              key={c}
              size="small"
              onClick={() => setBbColor(c)}
              style={{ border: "1px solid black" }}
            >
              <BsCircleFill color={c}></BsCircleFill>
            </IconButton>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ObjDetect;
