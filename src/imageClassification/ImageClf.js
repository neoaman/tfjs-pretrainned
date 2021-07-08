import React from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import {} from "@material-ui/lab";
import {} from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { BiChip } from "react-icons/bi";
import "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { useRef } from "react";

const ImageClf = () => {
  const imgRef = useRef(null);
  const [imhUrl, setImhUrl] = useState("/static/defaultImg.jpg");
  const [predVal, setPredVal] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async (params) => {
      const model_ = await mobilenet.load();
      setModel(model_);
    };
    loadModel();
  }, []);

  const predict = async (params) => {
    // const img = document.getElementById("img");
    const predictions = await model.classify(imgRef.current);
    console.log(predictions);
    setPredVal(predictions);
  };

  return (
    <Grid container justify="center" alignItems="center" direction="row">
      <Grid item xs={12} md={12} lg={5} align="center">
        <img
          src={imhUrl}
          ref={imgRef}
          style={{ maxHeight: "60vh", maxWidth: "100%" }}
          crossOrigin="anonymous"
          alt="Input"
        ></img>
        <TextField
          value={imhUrl}
          style={{ width: "100%" }}
          onChange={(e) => setImhUrl(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={12} md={12} lg={2} align="center">
        {model === null ? (
          <BiChip className="App-logo" size="20" color="steelblue"></BiChip>
        ) : (
          <IconButton onClick={() => predict()}>
            <AiOutlineDoubleRight size="20"></AiOutlineDoubleRight>
          </IconButton>
        )}
      </Grid>
      <Grid item xs={12} md={12} lg={5} align="center">
        {predVal &&
          predVal.map((q, i) => (
            <Grid
              key={i}
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Typography
                style={{ width: "90%" }}
                display="inline"
                align="center"
              >
                {q["className"]}
              </Typography>
              <LinearProgress
                color={q["probability"] * 100 > 50 ? "primary" : "secondary"}
                style={{ width: "90%" }}
                variant="determinate"
                value={q["probability"] * 100}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default ImageClf;
