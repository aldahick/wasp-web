import gql from "graphql-tag";
import { Query } from "./types";

export const STORY_BODY = gql`
query WebStoryBody($storyId: Int!) {
  story(id: $storyId) {
    id
    body
    categoryId
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
query WebFavoriteStories($page: Int!) {
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
export interface FavoriteStoriesParams {
  page: number;
}
export interface FavoriteStoriesResult {
  stories: Query["favoriteStories"];
}

export const STORIES_BY_CATEGORY = gql`
query WebStoriesByCategory($categoryId: Int!, $page: Int!) {
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
export interface StoriesByCategoryParams {
  categoryId: number;
  page: number;
}
export interface StoriesByCategoryResult {
  stories: Query["storiesByCategory"];
}

export const STORY_CATEGORIES = gql`
query WebStoryCategories {
  categories: storyCategories {
    id
    name
    description
    type
  }
}
`;
export interface StoryCategoriesResult {
  categories: Query["storyCategories"];
}

export const TOGGLE_STORY_FAVORITE = gql`
mutation WebToggleStoryFavorite($id: Int!) {
  toggleStoryFavorite(id: $id)
}
`;
export interface ToggleStoryFavoriteParams {
  id: number;
}
