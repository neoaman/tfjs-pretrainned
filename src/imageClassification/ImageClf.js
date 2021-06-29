import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  TextField,
  CardContent,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import {} from "@material-ui/lab";
import {} from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { BiChip } from "react-icons/bi";
import * as mobilenet from "@tensorflow-models/mobilenet";

const ImageClf = () => {
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
    const img = document.getElementById("img");
    const predictions = await model.classify(img);
    console.log(predictions);
    setPredVal(predictions);
  };

  return (
    <Grid container justify="center" alignItems="center" direction="row">
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ maxWidth: "30vw", height: "70vh" }}
      >
        <Card style={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Provide Image here"
              id="img"
              title="Input Image"
              style={{ maxHeight: "60vh", maxWidth: "30vw" }}
              image={imhUrl}
              crossorigin="anonymous"
            ></CardMedia>
            <CardContent>
              <TextField
                value={imhUrl}
                style={{ width: "100%" }}
                onChange={(e) => setImhUrl(e.target.value)}
              ></TextField>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid
        container
        style={{ maxWidth: "5vw" }}
        justify="center"
        alignItems="center"
        direction="column"
      >
        {model === null ? (
          <Grid item align="center" justify="center">
            <BiChip className="App-logo" size="40" color="steelblue"></BiChip>
          </Grid>
        ) : (
          <IconButton onClick={() => predict()}>
            <AiOutlineDoubleRight></AiOutlineDoubleRight>
          </IconButton>
        )}
      </Grid>
      <Grid container style={{ maxWidth: "30vw" }}>
        {predVal &&
          predVal.map((q) => (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Typography
                style={{ width: "25vw" }}
                display="inline"
                align="center"
              >
                {q["className"]}
              </Typography>
              <LinearProgress
                color={q["probability"] * 100 > 50 ? "primary" : "secondary"}
                style={{ width: "25vw" }}
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
