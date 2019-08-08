import gql from "graphql-tag";
import { MediaItem } from "./types";

export const LIST_MEDIA = gql`
query WebListMedia($dir: String!) {
  listMedia(dir: $dir) {
    key
    isFile
  }
}
`;

export interface ListMediaResult {
  listMedia: MediaItem[];
}