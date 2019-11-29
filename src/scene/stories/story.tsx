import { Grid, IconButton, Typography } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import * as _ from "lodash";
import React, { Fragment, ReactNode } from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { PagedView } from "../../component/stories/PagedView";
import { STORY_BODY, StoryBodyParams, StoryBodyResult, TOGGLE_STORY_FAVORITE, ToggleStoryFavoriteParams } from "../../graphql/stories";
import { Story } from "../../graphql/types";
import { callMutationSafe } from "../../util/graphql";

type StoryProps = {
  story: Story;
} & RouteComponentProps<{
  storyId: string;
}>;

export class StoryScene extends React.Component<StoryProps> {
  private renderPage(lines: string[]): ReactNode {
    return (
      <Typography dangerouslySetInnerHTML={{ __html: lines.join("<br />") }} />
    );
  }

  render() {
    const lastCategoryId = sessionStorage.getItem("lastStoryCategoryId") || undefined;
    return (
      <Query<StoryBodyResult, StoryBodyParams> query={STORY_BODY} variables={{ storyId: Number(this.props.match.params.storyId) }}>
        {({ loading, data, error }) => {
          if (loading) { return <Typography>Loading...</Typography>; }
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          const { id, body } = data.story;
          return (
            <Fragment>
              <Grid container>
                <IconButton onClick={() => this.props.history.push(lastCategoryId ? `/stories/category/${lastCategoryId}` : "/stories/categories")}>
                  <BackIcon />
                </IconButton>
                <Mutation<{}, ToggleStoryFavoriteParams> mutation={TOGGLE_STORY_FAVORITE}>
                  {toggleStoryFavorite => (
                    <IconButton onClick={() => callMutationSafe(toggleStoryFavorite, { id }).then(() => setTimeout(() => this.forceUpdate(), 2000))}>
                      <FavoriteOutlinedIcon color="secondary" />
                    </IconButton>
                  )}
                </Mutation>
              </Grid>
              <PagedView
                pages={_.chunk(body ? body.split(/<br \/>+/) : [], 10)}
                renderPage={this.renderPage}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
