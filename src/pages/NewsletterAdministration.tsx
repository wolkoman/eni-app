import Radium from "radium";
import React, { ReactChild, useEffect, useState } from "react";
import { FaEye, FaInbox, FaPaperPlane } from "react-icons/fa";
import { connect } from "react-redux";
import Box from "../components/Box";
import Loader from "../Graphic/Loader";
import { getApiKey } from "../store/auth.selector";
import { State } from "../store/state";
import cockpit from "../util/cockpit";
import { apiUrl } from "../util/config";
import { style } from "../util/style";

interface NewsletterDto {
  approved: boolean;
  headline: string;
  title: string;
  _id: string;
}
export default connect((state: State) => ({ api_key: getApiKey(state) }))(
  Radium(({ api_key }: { api_key: string }) => {
    const [newsletters, setNewsletters] = useState<NewsletterDto[]>();
    const [alerts, setAlerts] = useState<string[]>([]);
    const [sending, setSending] = useState(false);
    const [selectedNewsletter, setSelectedNewsletter] = useState<string>();
    useEffect(() => {
      cockpit
        .collection("newsletter", api_key)
        .then(result => setNewsletters(result.entries));
      return () => {};
    }, [api_key]);
    const send = () => {
      setSending(true);
      fetch(`${apiUrl}/newsletter-v1/send`, {
        method: "POST",
        body: JSON.stringify({ newsletter: selectedNewsletter, api_key }),
      })
        .then(x => x.json())
        .then(x => {
          setSending(false);
          setAlerts([...alerts, `Es wurden ${x.sentMails} Mails versendet.`]);
        });
    };
    const sendTest = () => {
      setSending(true);
      fetch(`${apiUrl}/newsletter-v1/test`, {
        method: "POST",
        body: JSON.stringify({ newsletter: selectedNewsletter, api_key }),
      })
        .then(x => x.json())
        .then(x => {
          setSending(false);
          setAlerts([
            ...alerts,
            `Eine Test-Mail wurde an ${x.approver} geschickt.`,
          ]);
        });
    };

    return newsletters ? (
      <div
        style={{ display: "flex", [style.mobile]: { flexDirection: "column" } }}
      >
        <div>
          <Box label="Newsletter Ausgaben">
            {newsletters.map(newsletter => (
              <ActionButton
                key={newsletter._id}
                label={newsletter.headline}
                onClick={() => setSelectedNewsletter(newsletter._id)}
              />
            ))}
          </Box>
          {alerts.map((alert, index) => (
            <Box label=" ">
              <ActionButton key={index} label={alert} />
            </Box>
          ))}
        </div>
        <div style={{ width: 20, height: 20 }}></div>
        <div style={{ flexGrow: 1 }}>
          <Box label="Anzeige">
            {selectedNewsletter ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ActionButton
                  label="Ansehen"
                  onClick={() => {
                    window.open(
                      `${apiUrl}/newsletter-v1/newsletter/${selectedNewsletter}`
                    );
                  }}
                  children={<FaEye />}
                />
                {newsletters.find(n => n._id === selectedNewsletter)
                  ?.approved ? (
                  <ActionButton
                    label="Versenden"
                    onClick={sending ? undefined : send}
                    children={<FaInbox />}
                  />
                ) : (
                  <ActionButton
                    label="Testmail schicken"
                    onClick={sending ? undefined : sendTest}
                    children={<FaPaperPlane />}
                  />
                )}
              </div>
            ) : null}
            <iframe
              title="preview"
              src={`${apiUrl}/newsletter-v1/newsletter/${selectedNewsletter}`}
              style={{
                width: "100%",
                height: 600,
                border: "none",
              }}
            ></iframe>
          </Box>
        </div>
      </div>
    ) : (
      <Loader />
    );
  })
);

const ActionButton = Radium(
  ({
    children,
    label,
    onClick,
  }: {
    onClick?: () => void;
    label: string;
    children?: ReactChild;
  }) => {
    return (
      <div
        onClick={onClick}
        style={{
          display: "flex",
          alignItems: "center",
          height: 40,
          padding: "0 20px",
          cursor: onClick ? "pointer" : "unset",
          [":hover" as any]: {
            opacity: onClick ? 0.7 : 1,
          },
        }}
      >
        {children}
        <div style={{ marginLeft: 5 }}>{label}</div>
      </div>
    );
  }
);
