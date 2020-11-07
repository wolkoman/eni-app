import React from "react";
import Radium from "radium";
import { Link } from "react-router-dom";
import { FaEye, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { State } from "../store/state";
import { connect } from "react-redux";
import { AuthState } from "../store/auth.state";
import { AuthActions, authLogout } from "../store/auth.action";

export default connect(
  (state: State) => ({
    state: state.auth,
  }),
  { authLogout }
)(
  Radium(
    ({
      state,
      authLogout,
    }: {
      state: AuthState;
      authLogout: () => AuthActions;
    }) => (
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: 20,
        }}
      >
        {[
          <FooterItem
            link="/impressum"
            title="Impressum & Datenschutz"
            icon={<FaEye />}
          ></FooterItem>,
          state.userdata ? (
            <FooterItem
              icon={<FaSignOutAlt />}
              title="Abmelden"
              onClick={authLogout}
            ></FooterItem>
          ) : (
            <FooterItem
              icon={<FaSignInAlt />}
              title="Anmelden"
              link="/login"
            ></FooterItem>
          ),
        ]
          .map((item, index) => [
            index === 0 ? null : (
              <FooterSeperator key={index + "s"}></FooterSeperator>
            ),
            { ...item, key: index },
          ])
          .flat()}
      </div>
    )
  )
);

const FooterItem = Radium(
  ({
    link,
    title,
    hard = false,
    icon = null,
    onClick = () => {},
  }: {
    link?: string;
    title: string;
    hard?: boolean;
    icon: any;
    onClick?: () => void;
  }) => {
    return hard ? (
      <a
        href={link}
        onClick={onClick}
        style={{
          color: "grey",
          textDecoration: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon ? (
          <div style={{ marginRight: 3, marginTop: 6 }}>{icon}</div>
        ) : null}
        {title}
      </a>
    ) : (
      <Link
        to={link ?? ""}
        onClick={onClick}
        style={{
          color: "grey",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon ? (
          <div style={{ marginRight: 3, marginTop: 6 }}>{icon}</div>
        ) : null}
        {title}
      </Link>
    );
  }
);
const FooterSeperator = Radium(() => {
  return <div style={{ margin: "4px 10px", color: "grey" }}>–</div>;
});
