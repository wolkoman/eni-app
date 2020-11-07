import Radium from "radium";
import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "../components/Box";
import { authLogin } from "../store/auth.action";
import { style } from "../util/style";

interface CredentialsDto {
  user: string;
  password: string;
}
enum State {
  ACTIVE,
  LOADING,
  INVALID,
}

export default connect(null, { authLogin })(
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
      if (Object.values(credentials).some((x) => x === "")) return;
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
            setValue={(user) => {
              setCredentials({ ...credentials, user });
              setState(State.ACTIVE);
            }}
          />
          <Input
            label="Passwort"
            value={credentials.password}
            disabled={state === State.LOADING}
            setValue={(password) => {
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

const Button = ({
  text,
  onClick,
  disabled = false,
}: {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "10px 20px",
      fontSize: 18,
      border: "none",
      background: style.accent2,
      color: "white",
      borderRadius: style.borderRadius,
    }}
  >
    {text}
  </button>
);

const Input = Radium(
  ({
    label,
    value,
    setValue,
    isPassword = false,
    disabled = false,
  }: {
    label: string;
    value: string;
    setValue: Dispatch<string>;
    isPassword?: boolean;
    disabled?: boolean;
  }) => (
    <div style={{ padding: "15px 0" }}>
      <div style={{ opacity: 0.7, textTransform: "uppercase", fontSize: 13 }}>
        {label}
      </div>
      <input
        disabled={disabled}
        type={isPassword ? "password" : "text"}
        style={{
          fontSize: 24,
          textAlign: "center",
        }}
        value={value}
        onChange={(e) =>
          setValue(((e.target as unknown) as { value: string }).value)
        }
      />
    </div>
  )
);
