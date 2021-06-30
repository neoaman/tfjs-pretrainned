import React from "react";
import Webcam from "react-webcam";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import { IoCameraReverse } from "react-icons/all";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const LiveObjectDetection = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const videoConstraints = {
    facingMode: FACING_MODE_USER,
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          setFacingMode((prevState) =>
            prevState === FACING_MODE_USER
              ? FACING_MODE_ENVIRONMENT
              : FACING_MODE_USER
          );
          console.log(facingMode);
        }}
      >
        <IoCameraReverse></IoCameraReverse>
      </IconButton>
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          ...videoConstraints,
          facingMode,
        }}
      />
    </div>
  );
};

export default LiveObjectDetection;
