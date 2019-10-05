import gql from "graphql-tag";
import { MutationFunction } from "react-apollo";
import { MutationCreateUserTokenArgs } from "./types";

export const CREATE_USER_TOKEN = gql`
mutation WebCreateUserToken($email: String!, $password: String!) {
  token: createUserToken(email: $email, password: $password)
}`;

export type CreateUserTokenMutation = MutationFunction<{
  token: string;
}, MutationCreateUserTokenArgs>;
