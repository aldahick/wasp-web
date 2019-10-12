import gql from "graphql-tag";
import { User } from "../types";

export const GET_USERS = gql`
query WebGetUsers($offset: Int!, $limit: Int!) {
  users(offset: $offset, limit: $limit) {
    email
  }
}
`;

export interface GetUsersResult {
  users: User[];
}
