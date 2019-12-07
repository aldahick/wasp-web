import gql from "graphql-tag";
import { MutationFunction } from "react-apollo";
import { AuthToken, MutationCreateUserTokenArgs } from "./types";

export const CREATE_USER_TOKEN = gql`
mutation WebCreateUserToken($email: String!, $password: String!) {
  authToken: createUserToken(email: $email, password: $password) {
    token
    user {
      permissions
    }
  }
}`;

export type CreateUserTokenMutation = MutationFunction<{
  authToken: AuthToken;
}, MutationCreateUserTokenArgs>;
