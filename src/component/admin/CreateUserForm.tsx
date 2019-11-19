import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_USER, CreateUserMutation } from "../../graphql/admin/users";
import { callMutationSafe } from "../../util/graphql";
import { Form } from "../Form";

export interface CreateUserFormProps {
  onComplete(): void;
}

export interface CreateUserFormState {
  errorMessage?: string;
}

export class CreateUserForm extends React.Component<CreateUserFormProps, CreateUserFormState> {
  readonly state: CreateUserFormState = { };

  private onCreateUser(createUser: CreateUserMutation) {
    return async ({ email, password }: {[key: string]: string}) => {
      try {
        await callMutationSafe(createUser, { email, password });
        this.props.onComplete();
      } catch (err) {
        console.error(err);
        this.setState({ errorMessage: err.message });
      }
    };
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <Grid>
          <Button onClick={this.props.onComplete}>Go back</Button>
          <Typography color="error">{this.state.errorMessage}</Typography>
        </Grid>
      );
    }
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser: CreateUserMutation) => (
          <Form
            fields={{
              email: {
                placeholder: "Email",
                isRequired: true
              },
              password: {
                placeholder: "Password",
                isRequired: true,
                type: "password"
              }
            }}
            onSubmit={this.onCreateUser(createUser)}
          />
        )}
      </Mutation>
    );
  }
}
