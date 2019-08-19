import gql from "graphql-tag";
import { Query } from "./types";

export const STORY_BODY = gql`
query WebStoryBody($storyId: Int!) {
  story(id: $storyId) {
    body
  }
}
`;
export interface StoryBodyParams {
  storyId: number;
}
export interface StoryBodyResult {
  story: Query["story"];
}

export const STORIES = gql`
query WebStories($categoryId: Int!, $page: Int!) {
  stories(categoryId: $categoryId, page: $page) {
    pageCount
    stories {
      _id
      title
      description
    }
  }
}
`;
export interface StoriesParams {
  categoryId: number;
  page: number;
}
export interface StoriesResult {
  stories: Query["stories"];
}

export const STORY_CATEGORIES = gql`
query WebStoryCategories {
  categories: storyCategories {
    _id
    name
    description
    type
  }
}
`;
export interface StoryCategoriesResult {
  categories: Query["storyCategories"];
}
