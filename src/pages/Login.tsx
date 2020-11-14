import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "../components/Box";
import { Button, Input } from "../components/FormElements";
import authAction from "../store/auth.action";

interface CredentialsDto {
  user: string;
  password: string;
}
enum State {
  ACTIVE,
  LOADING,
  INVALID,
}

export default connect(null, { authLogin: authAction.login })(
  ({
    authLogin,
  }: {
    authLogin: (user: string, password: string) => Promise<void>;
  }) => {
    const [credentials, setCredentials] = useState<CredentialsDto>({
      password: "",
      user: "",
    });
    const [state, setState] = useState<State>(State.ACTIVE);
    const history = useHistory();

    const login = () => {
      if (Object.values(credentials).some(x => x === "")) return;
      setState(State.LOADING);
      authLogin(credentials.user, credentials.password)
        .then(() => {
          setState(State.ACTIVE);
          history.push("/");
        })
        .catch(() => {
          setState(State.INVALID);
          setCredentials({ ...credentials, password: "" });
        });
    };
    return (
      <Box label="Login" padded={true} styled={true}>
        <div style={{ padding: "10px", textAlign: "center" }}>
          <Input
            label="Benutzername"
            value={credentials.user}
            disabled={state === State.LOADING}
            centered={true}
            setValue={user => {
              setCredentials({ ...credentials, user });
              setState(State.ACTIVE);
            }}
          />
          <Input
            label="Passwort"
            value={credentials.password}
            disabled={state === State.LOADING}
            centered={true}
            setValue={password => {
              setCredentials({ ...credentials, password });
              setState(State.ACTIVE);
            }}
            isPassword={true}
          />
          <Button
            text="Anmelden"
            onClick={login}
            disabled={state === State.LOADING}
          />
          <div>
            {state === State.INVALID
              ? "Die angegebenen Daten sind falsch."
              : null}
          </div>
        </div>
      </Box>
    );
  }
);
