import { Grid, Link, Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import React from "react";
import { SocialBadge } from "../component/SocialBadge";
import githubLogoUrl from "../images/logos/github.png";
import linkedInLogoUrl from "../images/logos/linkedin.png";

const Line = ({ children, ...props }: { children: React.ReactNode } & Omit<TypographyProps, "children">) =>
  <Typography style={{ textAlign: "center" }} {...props}>{children}</Typography>;

export class IndexScene extends React.Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item>
          <Line variant="h5">
            <Link href="https://github.com/aldahick">Alex Hicks</Link>
          </Line>
          <Line>I'm not a designer, forgive the atrocious visuals.</Line>
          <Line>I <strong>am</strong> a software engineer.</Line>
          <Line>This site is part of a small ecosystem of personal projects:</Line>
          <Line>
            <Link href="https://github.com/search?q=user%3Aaldahick+service-+OR+wasp-">Wasp and related microservices</Link>
          </Line>
          <Grid item style={{ marginTop: "1em" }}>
            <Grid container justify="center" spacing={4}>
              <Grid item>
                <SocialBadge
                  imageUrl={githubLogoUrl}
                  url="https://github.com/aldahick"
                  label="@aldahick"
                />
              </Grid>
              <Grid item>
                <SocialBadge
                  imageUrl={linkedInLogoUrl}
                  url="https://linkedin.com/in/aldahick"
                  label="@aldahick"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
