import * as _ from "lodash";
import React, { ReactNode } from "react";
import { Query } from "react-apollo";
import { STORY_CATEGORIES, StoryCategoriesResult } from "../graphql/stories";
import { Typography, Grid, Divider } from "@material-ui/core";
import { StoryListLink } from "../component/story/StoryListLink";
import { PagedView } from "../component/story/PagedView";
import { StoryCategory, StoryCategoryType } from "../graphql/types";

export class StoryCategoriesScene extends React.Component<{}> {
  private renderPage(categories: StoryCategory[]): ReactNode {
    return categories.map(category => (
      <Grid item key={category._id}>
        <StoryListLink to={`/storyCategory/${category._id}`}>
          <Typography variant="h6">{category.name}</Typography>
          <Typography variant="body2">{category.description}</Typography>
        </StoryListLink>
        <Divider variant="middle" />
      </Grid>
    ));
  }

  render() {
    return (
      <Query<StoryCategoriesResult> query={STORY_CATEGORIES}>
        {({ loading, data, error }) => {
          if (loading) return null;
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          return (
            <PagedView
              pages={_.chunk(data.categories.filter(c => c.type === StoryCategoryType.Story), 10)}
              renderPage={this.renderPage}
            />
          );
        }}
      </Query>
    );
  }
}
