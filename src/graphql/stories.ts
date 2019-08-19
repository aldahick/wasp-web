import gql from "graphql-tag";
import { Query } from "./types";

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
  }
}
`;
export interface StoryCategoriesResult {
  categories: Query["storyCategories"];
}
