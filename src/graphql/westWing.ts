import gql from "graphql-tag";
import { Query } from "./types";

export const WESTWING_EPISODES = gql`
query Web_WestWingEpisodes($seasonId: Int!) {
  episodes: westWingEpisodes(seasonId: $seasonId) {
    _id
    title
    airedAt
    number
  }
}
`;
export interface WestWingEpisodesResult {
  episodes: Query["westWingEpisodes"];
}

export const WESTWING_EPISODE = gql`
query Web_WestWingEpisode($id: Int!) {
  episode: westWingEpisode(id: $id) {
    _id
    title
    airedAt
    number
    transcript
    season {
      _id
    }
  }
}
`;
export interface WestWingEpisodeResult {
  episode: Query["westWingEpisode"];
}

export const WESTWING_SEASONS = gql`
query Web_WestWingSeasons {
  seasons: westWingSeasons {
    _id
  }
}
`;
export interface WestWingSeasonsResult {
  seasons: Query["westWingSeasons"];
}
