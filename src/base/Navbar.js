import { Typography, Grid } from "@material-ui/core";
import React from "react";
import { SiTensorflow } from "react-icons/si";

const Navbar = ({ title }) => {
  return (
    <Grid container direction="row" justify="left" alignItems="center">
      <SiTensorflow size="25"></SiTensorflow>
      <Typography variant="h5">{title}</Typography>
    </Grid>
  );
};

export default Navbar;
