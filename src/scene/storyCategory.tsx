import * as _ from "lodash";
import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { STORIES, StoriesResult, StoriesParams } from "../graphql/stories";
import { Typography, Grid, Divider, Button } from "@material-ui/core";
import { StoryListLink } from "../component/story/StoryListLink";
import { RouteComponentProps } from "react-router";

type StoryCategoryProps = RouteComponentProps<{
  categoryId: string;
}>;

interface StoryCategoryState {
  page: number;
}

export class StoryCategoryScene extends React.Component<StoryCategoryProps, StoryCategoryState> {
  private pageCount = 1;

  readonly state: StoryCategoryState = {
    page: 1
  };

  private onPageChange(change: number) {
    return () => {
      this.setState({
        page: _.clamp(this.state.page + change, 1, this.pageCount)
      });
    };
  }

  render() {
    const categoryId = Number(this.props.match.params.categoryId);
    const { page } = this.state;
    return (
      <Fragment>
        <Query<StoriesResult, StoriesParams> query={STORIES} variables={{ categoryId, page }}>
          {({ loading, data, error }) => {
            if (loading) return null;
            if (error || !data) {
              return (
                <Typography color="error">
                  {error ? error.message : "No data available."}
                </Typography>
              );
            }
            const { pageCount, stories } = data.stories;
            this.pageCount = pageCount;
            return (
              <Grid container direction="column">
                {stories.map(story => (
                  <Grid item key={story._id}>
                    <StoryListLink to={`/story/${story._id}`}>
                      <Typography variant="h6">{story.title}</Typography>
                      <Typography variant="body2">{story.description}</Typography>
                    </StoryListLink>
                    <Divider variant="middle" />
                  </Grid>
                ))}
              </Grid>
            );
          }}
        </Query>
        <Grid justify="space-between">
          <Button onClick={this.onPageChange(-1)}>Previous</Button>
          <Button onClick={this.onPageChange(1)}>Next</Button>
        </Grid>
      </Fragment>
    );
  }
}
