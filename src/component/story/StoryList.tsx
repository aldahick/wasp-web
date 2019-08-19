import { Typography, Grid, Divider } from "@material-ui/core";
import React, { ReactNode } from "react";
import { Query } from "react-apollo";
import { STORIES, StoriesResult, StoriesParams } from "../../graphql/stories";
import { StoryListLink } from "../../component/story/StoryListLink";
import { RouteComponentProps } from "react-router";
import { PagedView } from "../../component/story/PagedView";
import { Story } from "../../graphql/types";

interface StoryCategoryProps {
  args: Omit<StoriesParams, "page">;
}

interface StoryCategoryState {
  page: number;
}

export class StoryList extends React.Component<StoryCategoryProps, StoryCategoryState> {
  readonly state: StoryCategoryState = {
    page: 0
  };

  private renderPage = (stories: Story[]): ReactNode => (
    <Grid container direction="column">
      {stories.map(story => (
        <Grid item key={story._id}>
          <StoryListLink to={`/story/${story.categoryId}/${story._id}`}>
            <Typography variant="h6">{story.title}</Typography>
            <Typography variant="body2">{story.description}</Typography>
          </StoryListLink>
          <Divider variant="middle" />
        </Grid>
      ))}
    </Grid>
  );

  render() {
    const { page } = this.state;
    return (
      <Query<StoriesResult, StoriesParams> query={STORIES} variables={{ page: page + 1, ...this.props.args }}>
        {({ loading, data, error }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          const { pageCount, stories } = data.stories;
          return (
            <PagedView
              pages={{
                count: pageCount,
                current: stories,
                currentIndex: this.state.page,
                onPageChange: page => this.setState({ page })
              }}
              renderPage={this.renderPage}
            />
          );
        }}
      </Query>
    );
  }
}
