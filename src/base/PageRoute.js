import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../HomePage/Homepage";
import ImageClf from "../imageClassification/ImageClf";
const PageRoute = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage></Homepage>
      </Route>
      <Route path="/imageClassification" component={ImageClf}></Route>
      <Route path="/textClassification">
        Text Classification will be available soon ...
      </Route>
      <Route path="/repository">
        Link to all Repository will be available soon ...
      </Route>
      <Route path="/">Error Page</Route>
    </Switch>
  );
};

export default PageRoute;
