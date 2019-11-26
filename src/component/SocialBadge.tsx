import { Grid, Typography } from "@material-ui/core";
import { StyledComponentProps, StyleRules, withStyles } from "@material-ui/core/styles";
import * as React from "react";

const styles: StyleRules = {
  badgeContainer: {
    textDecoration: "none"
  }
};

interface SocialBadgeProps extends StyledComponentProps {
  label: React.ReactNode;
  imageUrl: string;
  url?: string;
  imageProps?: Partial<React.ImgHTMLAttributes<HTMLImageElement>>;
}

export const SocialBadge = withStyles(styles)(({ classes, imageProps = {}, imageUrl, label, url }: SocialBadgeProps) => (
  <a href={url} className={classes!.badgeContainer}>
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <img src={imageUrl} height={32} alt="Logo" {...imageProps} />
      </Grid>
      <Grid item>
        {typeof(label) === "string"
          ? <Typography color="inherit">
            {label}
          </Typography>
          : label}
      </Grid>
    </Grid>
  </a>
));
