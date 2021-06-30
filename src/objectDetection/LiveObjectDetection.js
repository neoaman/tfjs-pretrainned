import React from "react";
import Webcam from "react-webcam";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import { IoCameraReverse } from "react-icons/all";

const LiveObjectDetection = () => {
  const [facingMode, setFacingmode] = useState("user");

  return (
    <div>
      <IconButton
        onClick={() =>
          facingMode === "user"
            ? setFacingmode("forward")
            : facingMode === "forward"
            ? setFacingmode("selfie")
            : setFacingmode("user")
        }
      >
        <IoCameraReverse></IoCameraReverse>
      </IconButton>
      {/* <Webcam videoConstraints={{ facingMode: facingMode }}></Webcam> */}
      <Webcam
        videoConstraints={{ facingMode: { exact: "environment" } }}
      ></Webcam>
    </div>
  );
};

export default LiveObjectDetection;
