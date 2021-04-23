import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      history.push('/');
    }
  });
  
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      history.push('/');
    }
  });

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.firstName}
            onChange={(e) =>
              setFormState({
                ...formState,
                firstName: e.target.value
              })
            }
            type="text"
            placeholder="Your First Name"
          />
        )}
        {!formState.login && (
          <input
            value={formState.lastName}
            onChange={(e) =>
              setFormState({
                ...formState,
                lastName: e.target.value
              })
            }
            type="text"
            placeholder="Your Last Name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
            className="pointer mr2 button"
            onClick={formState.login ? login : signup}
        >
            {formState.login ? 'login' : 'create account'}
        </button>
        <button
            className="pointer button"
            onClick={(e) =>
            setFormState({
                ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;