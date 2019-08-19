import { createStyles, withStyles, WithStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";

const styles = createStyles({
  listLink: {
    color: "inherit",
    textDecoration: "none"
  }
});

export type StoryListLinkProps = React.PropsWithChildren<{
  to: string;
}> & WithStyles<typeof styles>;

export const StoryListLink = withStyles(styles)(({ children, classes, to }: StoryListLinkProps) => (
  <Link to={to} className={classes.listLink}>
    {children}
  </Link>
));
