import gql from "graphql-tag";
import { MutationCreateUserTokenArgs } from "./types";
import { MutationFunction } from "react-apollo";

export const CREATE_USER_TOKEN = gql`
mutation WebCreateUserToken($username: String!, $password: String!) {
  token: createUserToken(username: $username, password: $password)
}`;

export type CreateUserTokenMutation = MutationFunction<{
  token: string
}, MutationCreateUserTokenArgs>;
