import { AppBar, createStyles, MenuItem, Toolbar, withStyles, WithStyles } from "@material-ui/core";
import * as _ from "lodash";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Permission } from "../graphql/types";
import { UserState } from "./auth/UserState";

const styles = createStyles({
  link: {
    color: "white",
    textDecoration: "none"
  }
});

// links which don't matter, auth or not
const BOTH_NAVBAR_LINKS = {
  "West Wing": "/westwing/episodes"
};

const NAVBAR_LINKS = {
  noAuth: {
    "Hello!": "/",
    ...BOTH_NAVBAR_LINKS
  },
  authRequired: {
    ...BOTH_NAVBAR_LINKS,
    "Media": {
      link: "/media",
      permission: Permission.Media
    },
    "Categories": {
      link: "/stories/categories",
      permission: Permission.Stories
    },
    "Favorites": {
      link: "/stories/favorites",
      permission: Permission.Stories
    },
    "User Management": {
      link: "/admin/users",
      permission: Permission.ManageUsers
    }
  }
};

export const Navbar = withRouter(withStyles(styles)(class extends React.Component<RouteComponentProps & WithStyles<typeof styles>> {
  onNavigate(url: string) {
    return () => this.props.history.push(url);
  }

  getAuthLinks(): {[key: string]: string} {
    if (UserState.isAuthenticated) {
      return { "Log out": "/logout" };
    }
    return {
      "Log in": "/login"
    };
  }

  renderLinks(links: {[key: string]: string | { link: string; permission: Permission }}) {
    const { classes } = this.props;
    return _.compact(Object.entries(links).map(([label, item]) => {
      const link = typeof(item) === "string" ? item : item.link;
      if (typeof(item) !== "string" && !UserState.isAuthorized(item.permission)) {
        return undefined;
      }
      return (
        <MenuItem key={label} onClick={this.onNavigate(link)}>
          <Link to={link} className={classes.link}>
            {label}
          </Link>
        </MenuItem>
      );
    }));
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          {this.renderLinks(NAVBAR_LINKS.noAuth)}
          {UserState.isAuthenticated && this.renderLinks(NAVBAR_LINKS.authRequired)}
          <div style={{ flexGrow: 1 }} />
          {this.renderLinks(this.getAuthLinks())}
        </Toolbar>
      </AppBar>
    );
  }
}) as any);
