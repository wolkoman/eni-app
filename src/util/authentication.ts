import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiUrl } from "./config";
import { localStorageGet, localStorageSet } from "./utils";

export interface Credentials {
  api_key: string;
  email: string;
  group: string;
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
      history.push("/login");
    },
    login: (credentials: { user: string; password: string }) =>
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
