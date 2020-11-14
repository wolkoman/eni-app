import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "../components/Box";
import { isOrganist } from "../store/auth.selector";
import { State } from "../store/state";

export default connect((state: State) => ({ isOrganist: isOrganist(state) }))(
  ({ isOrganist }: { isOrganist: boolean }) => {
    const history = useHistory();
    const [months] = useState(new Date().getUTCMonth());
    useEffect(() => {
      if (!isOrganist) history.push("/");
    }, [isOrganist, history]);

    return (
      <Box label="Einteilung" padded={true} styled={true}>
        {months}
      </Box>
    );
  }
);
/*
const ButtonSelector = ({
  buttons = {},
  onChange,
}: {
  buttons: { [id: string]: string };
  onChange: (button: string) => void;
}) => <div>{Object.entries(buttons)}</div>;
const Button = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return <div onClick={onClick}>{label}</div>;
};
*/
