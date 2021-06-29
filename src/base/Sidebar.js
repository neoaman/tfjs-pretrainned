import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

import {} from "react-icons/im";
// import { FaRegObjectGroup } from "react-icons/fa";
import {
  // FcDocument,
  FcHome,
  FcPicture,
  FcSelfie,
} from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";

const useStyles = makeStyles({
  navlink: {
    textDecoration: "none",
    color: "#293241",
  },
  activelink: {
    fontWeight: "bolder",
    color: "#8e96a3",
    backgroundColor: "#425066",
    "&:hover": {
      backgroundColor: "#425066",
      opacity: 1,
    },
  },
  itemlist: {},
});

const Sidebar = () => {
  const classes = useStyles();
  return (
    <List component="nav" className={classes.itemlist}>
      <ListItem
        button
        component={NavLink}
        exact
        to="/"
        className={classes.navlink}
        activeClassName={classes.activelink}
      >
        <ListItemIcon>
          <FcHome size={25}></FcHome>
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/imageClassification"
        className={classes.navlink}
        activeClassName={classes.activelink}
      >
        <ListItemIcon>
          <FcPicture size={25}></FcPicture>
        </ListItemIcon>
        <ListItemText primary="Image Classification" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/objectDetection"
        className={classes.navlink}
        activeClassName={classes.activelink}
      >
        <ListItemIcon>
          <FcSelfie size={25} color="blue"></FcSelfie>
        </ListItemIcon>
        <ListItemText primary="Object Detection" />
      </ListItem>

      {/* <ListItem
        button
        component={NavLink}
        to="/textClassification"
        className={classes.navlink}
        activeClassName={classes.activelink}
      >
        <ListItemIcon>
          <FcDocument size={25}></FcDocument>
        </ListItemIcon>
        <ListItemText primary="Text Classification" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/repository"
        className={classes.navlink}
        activeClassName={classes.activelink}
      >
        <ListItemIcon>
          <FaGithub size={25}></FaGithub>
        </ListItemIcon>
        <ListItemText primary="Repository" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/contact"
        className={classes.navlink}
        activeClassName={classes.activelink}
      >
        <ListItemIcon>
          <FcCustomerSupport size={25}></FcCustomerSupport>
        </ListItemIcon>
        <ListItemText primary="Contact Information" />
      </ListItem> */}
    </List>
  );
};

export default Sidebar;
