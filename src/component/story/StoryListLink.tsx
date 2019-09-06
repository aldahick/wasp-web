import { createStyles, withStyles, WithStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const styles = createStyles({
  listLink: {
    color: "inherit",
    textDecoration: "none"
  }
});

export type StoryListLinkProps = {
  title: string;
  description: string;
  to: string;
} & WithStyles<typeof styles>;

export const StoryListLink = withStyles(styles)(({ classes, title, description, to }: StoryListLinkProps) => (
  <Link to={to} className={classes.listLink}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body2">{description}</Typography>
  </Link>
));
