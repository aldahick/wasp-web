import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import { createStyles, WithStyles } from "@material-ui/core/styles";
import React from "react";
import { Mutation } from "react-apollo";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { UserState } from "../component/auth";
import { Form } from "../component/Form";
import { CREATE_USER_TOKEN, CreateUserTokenMutation } from "../graphql/auth";
import { callMutationSafe } from "../util/graphql";

interface LoginSceneState {
  shouldRedirect: boolean;
  errorMessage?: string;
}

const styles = createStyles({
  errorMessage: {
    color: "red"
  },
  registerContainer: {
    "paddingTop": "1em",
    "& a": {
      textDecoration: "none"
    }
  }
});

export const LoginScene = withStyles(styles)(class extends React.Component<WithStyles<typeof styles> & RouteComponentProps, LoginSceneState> {
  readonly state: LoginSceneState = {
    shouldRedirect: UserState.isAuthenticated,
    errorMessage: undefined
  };

  submit = (createUserToken: CreateUserTokenMutation) => async(fields: {
    [key in "email" | "password"]: string;
  }) => {
    try {
      const { authToken: { token, user } } = await callMutationSafe(createUserToken, fields);
      UserState.setAuth(token, user);
      this.setState({ shouldRedirect: true });
    } catch (err) {
      console.error(err);
      this.setState({
        errorMessage: err.message.includes("invalid email or password")
          ? "Invalid email or password."
          : err.message
      });
    }
  };

  render() {
    if (UserState.isAuthenticated || this.state.shouldRedirect) {
      return <Redirect to={(this.props.location.state || { from: "/" }).from} />;
    }
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={9} md={6} lg={4}>
          <Grid container direction="column">
            <Mutation mutation={CREATE_USER_TOKEN}>{(createUserToken: CreateUserTokenMutation) => (
              <Form
                errorMessage={this.state.errorMessage}
                fields={{
                  email: {
                    placeholder: "Email"
                  },
                  password: {
                    placeholder: "Password",
                    type: "password"
                  }
                }}
                submitText="Log In"
                onSubmit={this.submit(createUserToken)}
              />
            )}</Mutation>
            <Grid container justify="center" className={classes.registerContainer}>
              <Typography variant="h5">
                <Link to="/register">
                  <Button variant="contained" color="secondary">
                    Register
                  </Button>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
});
