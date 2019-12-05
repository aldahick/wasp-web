import gql from "graphql-tag";
import { MediaItem } from "./types";

export const LIST_MEDIA = gql`
query Web_ListMedia($dir: String!) {
  listMedia(dir: $dir) {
    key
    type
  }
}
`;
export interface ListMediaResult {
  listMedia: MediaItem[];
}

export const SCRAPE_MEDIA = gql`
mutation Web_ScrapeMedia($url: String!, $destination: String!) {
  scrapeMedia(url: $url, destination: $destination) {
    key
    type
  }
}
`;
export interface ScrapeMediaResult {
  scrapeMedia: MediaItem[];
}
