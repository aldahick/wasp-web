import * as _ from "lodash";
import React, { ReactNode, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { Typography, IconButton, Grid } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { RouteComponentProps } from "react-router";
import { StoryBodyResult, STORY_BODY, StoryBodyParams, ToggleStoryFavoriteParams, TOGGLE_STORY_FAVORITE } from "../graphql/stories";
import { Story } from "../graphql/types";
import { PagedView } from "../component/story/PagedView";

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
          if (loading) return null;
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          console.log(data);
          const { _id, body, isFavorite } = data.story;
          return (
            <Fragment>
              <Grid container>
                <IconButton onClick={() => this.props.history.push(lastCategoryId ? `/storyCategory/${lastCategoryId}` : "/storyCategories")}>
                  <BackIcon />
                </IconButton>
                <Mutation<{}, ToggleStoryFavoriteParams> mutation={TOGGLE_STORY_FAVORITE}>
                  {toggleStoryFavorite => (
                    <IconButton onClick={() => toggleStoryFavorite({ variables: { id: _id } }).then(() => setTimeout(() => this.forceUpdate(), 2000))}>
                      {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteOutlinedIcon color="secondary" />}
                    </IconButton>
                  )}
                </Mutation>
              </Grid>
              <PagedView
                pages={_.chunk(body.split(/<br \/>+/), 10)}
                renderPage={this.renderPage}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
