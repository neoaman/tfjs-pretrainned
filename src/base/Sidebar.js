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
import { FcDocument, FcHome, FcPicture } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const useStyles = makeStyles({
  navlink: {
    textDecoration: "none",
    color: "black",
    fa_icon: {
      color: "blue",
    },
  },
  activelink: {
    fontWeight: "bolder",
    color: "blue",
    backgroundColor: "LightSteelBlue",
    "&:hover": {
      backgroundColor: "LightSteelBlue",
      opacity: 1,
    },
    fa_icon: {
      color: "blue",
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

      {/* <ListItem
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
