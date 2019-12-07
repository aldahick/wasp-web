import { Button, Grid, Link, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { GraphqlSelect } from "../../component/GraphqlSelect";
import { QueryWestWingEpisodesArgs } from "../../graphql/types";
import { WESTWING_EPISODES, WESTWING_SEASONS, WestWingEpisodesResult, WestWingSeasonsResult } from "../../graphql/westWing";

export const WestWingEpisodesScene: React.FC = () => {
  const [seasonId, setSeasonId] = useState<string>();
  const [episodeId, setEpisodeId] = useState<string>();

  return (
    <Grid container>
      <Grid container alignItems="center" justify="center" spacing={3}>
        <Grid item>
          <GraphqlSelect<WestWingSeasonsResult, {}>
            inputLabel="Season"
            query={WESTWING_SEASONS}
            variables={{}}
            onChange={setSeasonId}
            getOptions={({ seasons }) =>
              seasons.map(({ _id }) => ({ value: _id.toString() }))
            }
          />
        </Grid>
        <Grid item>
          <GraphqlSelect<WestWingEpisodesResult, QueryWestWingEpisodesArgs>
            inputLabel="Episode"
            query={WESTWING_EPISODES}
            variables={{ seasonId: Number(seasonId || "1") }}
            onChange={setEpisodeId}
            getOptions={({ episodes }) =>
              episodes.map(({ title, _id }) => ({ value: _id.toString(), label: title }))
            }
          />
        </Grid>
        <Grid item>
          <Button color="primary">
            <Link href={`/westwing/episodes/${episodeId || 1}`}>View Transcript</Link>
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center" style={{ marginTop: "1em" }}>
        <Grid item>
          <Typography style={{ textAlign: "center" }}>
            All data is sourced from <Link href="http://www.westwingtranscripts.com">westwingtranscripts.com</Link>.
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            The source code for the scraper can be found <Link href="https://github.com/aldahick/service-westwing">at the microservice's GitHub repository</Link>.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
