import React from "react";
import { Query } from "react-apollo";
import { STORY_CATEGORIES, StoryCategoriesResult } from "../graphql/stories";
import { Typography, Grid, Divider } from "@material-ui/core";
import { StoryListLink } from "../component/story/StoryListLink";

export class StoryCategoriesScene extends React.Component<{}> {
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
            <Grid container direction="column">
              {data.categories.map(category => (
                <Grid item key={category._id}>
                  <StoryListLink to={`/storyCategory/${category._id}`}>
                    <Typography variant="h6">{category.name}</Typography>
                    <Typography variant="body2">{category.description}</Typography>
                  </StoryListLink>
                  <Divider variant="middle" />
                </Grid>
              ))}
            </Grid>
          );
        }}
      </Query>
    );
  }
}
