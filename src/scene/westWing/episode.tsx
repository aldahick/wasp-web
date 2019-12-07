import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { QueryWestWingEpisodeArgs } from "../../graphql/types";
import { WESTWING_EPISODE, WestWingEpisodeResult } from "../../graphql/westWing";
import { checkQueryResult } from "../../util/graphql";

type WestWingEpisodeSceneProps = RouteComponentProps<{ episodeId: string}>;

export const WestWingEpisodeScene = (props: WestWingEpisodeSceneProps) => {
  const { episodeId } = props.match.params;
  return (
    <Query<WestWingEpisodeResult, QueryWestWingEpisodeArgs> query={WESTWING_EPISODE} variables={{ id: Number(episodeId) }}>
      {checkQueryResult<WestWingEpisodeResult>(({ episode }) => (
        <Grid container>
          <Grid item>
            <Typography variant="h4">
              S{episode.season._id}E{episode.number} - {episode.title}
            </Typography>
            <pre>{episode.transcript || "No transcript for this episode."}</pre>
          </Grid>
        </Grid>
      ))}
    </Query>
  );
};
