import { Grid, IconButton, Typography, Button } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import FavoriteFilledIcon from "@material-ui/icons/Favorite";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteBorder";
import * as _ from "lodash";
import React, { Fragment, useState } from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { PagedView } from "../../component/stories/PagedView";
import { STORY_BODY, StoryBodyParams, StoryBodyResult, TOGGLE_STORY_FAVORITE, ToggleStoryFavoriteParams } from "../../graphql/stories";
import { Story } from "../../graphql/types";
import { callMutationSafe, checkQueryResult } from "../../util/graphql";

type StoryProps = {
  story: Story;
} & RouteComponentProps<{
  storyId: string;
}>;

const renderStoryLines = (lines: string[]) => (
  <Typography dangerouslySetInnerHTML={{ __html: lines.join("<br />") }} />
);

export const StoryScene: React.FC<StoryProps> = props => {
  const [isFavorited, setIsFavorited] = useState();
  return (
    <Query<StoryBodyResult, StoryBodyParams> query={STORY_BODY} variables={{ storyId: Number(props.match.params.storyId) }}>
      {checkQueryResult<StoryBodyResult>(({ story: { id, body, series } }) => (
        <Fragment>
          <Grid container>
            <IconButton onClick={() => props.history.goBack()}>
              <BackIcon />
            </IconButton>
            {series && (
              <Button onClick={() => props.history.push(`/stories/series/${series.id}`)}>
                <Typography>Series</Typography>
              </Button>
            )}
            <Mutation<{}, ToggleStoryFavoriteParams> mutation={TOGGLE_STORY_FAVORITE}>
              {toggleStoryFavorite => (
                <IconButton onClick={() => callMutationSafe(toggleStoryFavorite, { id }).then(() => setIsFavorited(!isFavorited))}>
                  {isFavorited
                    ? <FavoriteOutlinedIcon color="secondary" />
                    : <FavoriteFilledIcon color="secondary" />
                  }
                </IconButton>
              )}
            </Mutation>
          </Grid>
          <PagedView
            pages={_.chunk(body ? body.split(/<br \/>+/) : [], 10)}
            renderPage={renderStoryLines}
          />
        </Fragment>
      ))}
    </Query>
  );
};
