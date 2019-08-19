import { AppBar, createStyles, MenuItem, Toolbar, withStyles, WithStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { UserState } from "./auth/UserState";
import scenes from "../scenes";

const styles = createStyles({
  link: {
    color: "white",
    textDecoration: "none"
  }
});

const NAVBAR_LINKS = {
  noAuth: {
    "Hello!": "/"
  },
  authRequired: {
    "Media": "/media",
    "Categories": "/storyCategories",
    "Favorites": "/storyFavorites"
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
      "Log in": "/login",
      // "Register": "/register"
    };
  }

  renderLinks(links: {[key: string]: string}) {
    const { classes } = this.props;
    return Object.keys(links).map(label => (
      <MenuItem key={label} onClick={this.onNavigate(links[label])}>
        <Link to={links[label]} className={classes.link}>
          {label}
        </Link>
      </MenuItem>
    ));
  }

  render() {
    let customNavbarLinks: {[key: string]: string} | undefined;
    const actualTokens = this.props.location.pathname.split("/");
    for (const scene of scenes) {
      const sceneTokens = scene.route.split("/");
      if (!sceneTokens.some((t, i) => !t.startsWith(":") && t !== actualTokens[i])) {
        if (scene.navbarLinks) {
          customNavbarLinks = scene.navbarLinks(this.props);
        }
      }
    }
    console.log(this.props);
    return (
      <AppBar position="static">
        <Toolbar>
          {customNavbarLinks ? this.renderLinks(customNavbarLinks) : (
            <Fragment>
              {this.renderLinks(NAVBAR_LINKS.noAuth)}
              {UserState.isAuthenticated && this.renderLinks(NAVBAR_LINKS.authRequired)}
              <div style={{ flexGrow: 1 }} />
              {this.renderLinks(this.getAuthLinks())}
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}));
