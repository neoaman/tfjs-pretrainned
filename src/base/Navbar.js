import { Typography, Grid } from "@material-ui/core";
import React from "react";
import { SiTensorflow } from "react-icons/si";

const Navbar = ({ title }) => {
  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <SiTensorflow size="25" color="#ff9100"></SiTensorflow>
      <Typography
        variant="h6"
        style={{ marginInline: 10, fontFamily: "fantasy" }}
      >
        {title}
      </Typography>
    </Grid>
  );
};

export default Navbar;
