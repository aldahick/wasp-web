import gql from "graphql-tag";
import { MutationFunction } from "react-apollo";
import { MutationCreateUserArgs, User } from "../types";

export const GET_USERS = gql`
query WebGetUsers($offset: Int!, $limit: Int!) {
  users(offset: $offset, limit: $limit) {
    _id
    createdAt
    email
    roles {
      _id
      name
    }
  }
}
`;

export interface GetUsersResult {
  users: User[];
}

export const CREATE_USER = gql`
mutation WebCreateUser($email: String!, $password: String!) {
  user: createUser(email: $email, password: $password) {
    _id
  }
}
`;
export interface CreateUserResult {
  user: User;
}
export type CreateUserMutation = MutationFunction<CreateUserResult, MutationCreateUserArgs>;
