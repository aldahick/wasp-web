import gql from "graphql-tag";
import { Query } from "./types";

export const STORY_BODY = gql`
query Web_StoryBody($storyId: Int!) {
  story(id: $storyId) {
    id
    body
    categoryId
    series {
      id
    }
  }
}
`;
export interface StoryBodyParams {
  storyId: number;
}
export interface StoryBodyResult {
  story: Query["story"];
}

export const FAVORITE_STORIES = gql`
query Web_FavoriteStories($page: Int!) {
  stories: favoriteStories(page: $page) {
    pageCount
    stories {
      id
      categoryId
      title
      description
    }
  }
}
`;
export interface FavoriteStoriesResult {
  stories: Query["favoriteStories"];
}

export const STORIES_BY_CATEGORY = gql`
query Web_StoriesByCategory($categoryId: Int!, $page: Int!) {
  stories: storiesByCategory(categoryId: $categoryId, page: $page) {
    pageCount
    stories {
      id
      categoryId
      title
      description
    }
  }
}
`;
export interface StoriesByCategoryResult {
  stories: Query["storiesByCategory"];
}

export const STORIES_BY_SERIES = gql`
query Web_StoriesBySeries($seriesId: Int!, $page: Int!) {
  stories: storiesBySeries(seriesId: $seriesId, page: $page) {
    pageCount
    stories {
      id
      categoryId
      title
      description
    }
  }
}
`;
export interface StorySeriesResult {
  stories: Query["storiesBySeries"];
}

export const STORY_CATEGORIES = gql`
query Web_StoryCategories {
  categories: storyCategories {
    id
    name
    description
  }
}
`;
export interface StoryCategoriesResult {
  categories: Query["storyCategories"];
}

export const TOGGLE_STORY_FAVORITE = gql`
mutation Web_ToggleStoryFavorite($id: Int!) {
  toggleStoryFavorite(id: $id)
}
`;
export interface ToggleStoryFavoriteParams {
  id: number;
}
