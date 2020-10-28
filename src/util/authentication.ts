import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiUrl } from "./config";
import { localStorageGet, localStorageSet } from "./utils";

export interface Credentials {
  user: string;
  password: string;
}
export function useAuthentication() {
  const [credentials, setCredentials] = useState<Credentials>();
  const history = useHistory();
  const update = () => {
    const credentials = localStorageGet("credentials");
    setCredentials(credentials);
  };

  useEffect(() => {
    update();
    return () => {};
  }, []);

  return {
    credentials,
    loggedIn: !!credentials,
    loginPrompt: () => {
      console.log("LOGIN");
      history.push("/login");
    },
    login: (credentials: Credentials) =>
      fetch(`${apiUrl}/authentication-v1/`, {
        method: "POST",
        body: JSON.stringify(credentials),
      })
        .then((x) => {
          if (x.status !== 200) return Promise.reject();
          return x.json();
        })
        .then((x) => {
          localStorageSet("credentials", x);
          update();
        }),

    logout: () => {
      localStorageSet("credentials", null);
      update();
    },
  };
}
