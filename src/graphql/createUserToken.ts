import gql from "graphql-tag";
import { MutationCreateUserTokenArgs } from "./types";
import { MutationFunction } from "react-apollo";

export const CREATE_USER_TOKEN = gql`
mutation WebCreateUserToken($email: String!, $password: String!) {
  token: createUserToken(email: $email, password: $password)
}`;

export type CreateUserTokenMutation = MutationFunction<{
  token: string;
}, MutationCreateUserTokenArgs>;
