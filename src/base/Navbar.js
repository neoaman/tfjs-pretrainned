import { Typography, Grid } from "@material-ui/core";
import React from "react";
import { SiTensorflow } from "react-icons/si";

const Navbar = ({ title }) => {
  return (
    <Grid container direction="row" justify="left" alignItems="center">
      <SiTensorflow size="30" color="#ff9100"></SiTensorflow>
      <Typography
        variant="h5"
        style={{ marginInline: 10, fontFamily: "fantasy" }}
      >
        {title}
      </Typography>
    </Grid>
  );
};

export default Navbar;
