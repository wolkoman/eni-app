import { useEffect } from "react";
import { useAuthentication } from "./authentication";

export enum Autorisation {
  ORGANIST,
  ADMIN,
}
enum AutorisationStatus {
  PENDING,
  GRANTED,
  DENIED,
}
const autorisationAccess: Record<Autorisation, string[]> = {
  [Autorisation.ORGANIST]: ["Organist", "OrganistAdmin", "admin"],
  [Autorisation.ADMIN]: ["admin"],
};
export function useRequireAutorisation(autorisation: Autorisation) {
  const authentication = useAuthentication();

  useEffect(() => {
    console.log("autor", authentication.credentials?.group);
    if (
      authentication.credentials?.group &&
      !autorisationAccess[autorisation].includes(
        authentication.credentials?.group!
      )
    )
      authentication.loginPrompt();
    return () => {};
  }, [authentication]);

  /*
  return {
    is: (autorisation: Autorisation) =>
      autorisationAccess[autorisation].includes(
        authentication.credentials?.group!
      ),
    require: (autorisation: Autorisation) => {
      console.log(
        autorisationAccess[autorisation],
        authentication.credentials?.group!
      );
      if (
        authentication.credentials?.group &&
        !autorisationAccess[autorisation].includes(
          authentication.credentials?.group!
        )
      )
        authentication.loginPrompt();
    },
  };
  */
}
