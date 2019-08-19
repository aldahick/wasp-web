import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Story } from "../../graphql/types";
import { StoryListLink } from "./StoryListLink";

interface StoryListProps {
  fetch(page: number): Promise<{
    pageCount: number;
    stories: Story[];
  }>;
}

interface StoryListState {
  page: number;
  pageCount: number;
  isLoading: boolean;
  stories: Story[];
}

export class StoryList extends React.Component<StoryListProps, StoryListState> {
  readonly state: StoryListState = {
    page: 1,
    pageCount: 1,
    stories: [],
    isLoading: true
  };

  async componentDidMount() {
    await this.fetch();
  }

  async fetch() {
    const { stories, pageCount } = await this.props.fetch(this.state.page);
    this.setState({ stories, pageCount, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <Typography>Loading...</Typography>;
    }
    return (
      <Grid container direction="column">
        {this.state.stories.map(story => (
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
  }
}
