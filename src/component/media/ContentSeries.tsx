import { Button, Grid, Typography } from "@material-ui/core";
import * as _ from "lodash";
import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { LIST_MEDIA, ListMediaResult } from "../../graphql/media";
import { MediaItemType, QueryListMediaArgs } from "../../graphql/types";
import { ContentView } from "./ContentView";

export interface ContentSeriesProps {
  dir: string;
}

interface ContentSeriesState {
  selectedIndex: number;
}

export class ContentSeries extends React.Component<ContentSeriesProps> {
  readonly state: ContentSeriesState = {
    selectedIndex: 0
  };

  private addToSelectedIndex(increment: number, max: number) {
    const newIndex = this.state.selectedIndex + increment;
    this.setState({
      selectedIndex: _.clamp(newIndex, 0, max)
    });
  }

  render() {
    const { dir } = this.props;
    return (
      <Query<ListMediaResult, QueryListMediaArgs> query={LIST_MEDIA} variables={{ dir }}>
        {({ data, loading, error }) => {
          if (loading) { return <Typography>Loading...</Typography>; }
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          let keys = data.listMedia
            .filter(i => i.type === MediaItemType.File)
            .map(i => i.key);
          keys = _.sortBy(keys, k => Number(k.split("/").slice(-1)[0].split(".")[0]));
          const { selectedIndex } = this.state;
          const selectedKey = dir.split("/").concat([keys[selectedIndex]]).join("/");
          return (
            <Fragment>
              <Grid container>
                <Button
                  disabled={selectedIndex <= 0}
                  onClick={() => this.addToSelectedIndex(-1, keys.length - 1)}
                >
                  Previous
                </Button>
                <Button
                  disabled={selectedIndex >= keys.length - 1}
                  onClick={() => this.addToSelectedIndex(1, keys.length - 1)}
                >
                  Next
                </Button>
              </Grid>
              <ContentView onClick={() => this.addToSelectedIndex(1, keys.length - 1)} targetKey={selectedKey} />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
