import React from "react";
import { Grid, Typography } from "@material-ui/core";
const Homepage = () => {
  return (
    <Grid
      container
      spacing={3}
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Typography variant="h5" color="primary">
        Tensorflow Javascript
      </Typography>
      <Typography style={{ maxWidth: "80vw", padding: 5 }}>
        Its a opensource Javascript library, which is capable enough to train
        and serve a complex neural network without any backened. There are lots
        of pre trainned models available in its official site, here are few of
        them.
      </Typography>
    </Grid>
  );
};

export default Homepage;
