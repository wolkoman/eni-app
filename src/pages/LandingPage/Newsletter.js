import React from "react";
import Box from "../../components/Box";

export default () => (
  <Box label="Newsletter" padded={true} styled={true}>
    <div id="mc_embed_signup">
      <form
        action="https://tesarekplatz.us18.list-manage.com/subscribe/post?u=8b6f391cfa55dadcb0fb776fe&amp;id=a735c113ed"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        class="validate"
        target="_blank"
        novalidate
      >
        <div id="mc_embed_signup_scroll">
          <h2>Anmeldung zum Newsletter</h2>
          <div class="mc-field-group">
            <label for="mce-EMAIL">
              Email Address <span class="asterisk">*</span>
            </label>
            <div>
              <input
                type="email"
                value=""
                name="EMAIL"
                class="required email"
                id="mce-EMAIL"
              />
            </div>
          </div>
          <div class="mc-field-group input-group">
            <strong>Pfarrzugehörigkeit </strong>
            <div>
              <input
                type="checkbox"
                value="1"
                name="group[213406][1]"
                id="mce-group[213406]-213406-0"
              />
              <label for="mce-group[213406]-213406-0">
                Pfarre Emmaus am Wienerberg
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                value="2"
                name="group[213406][2]"
                id="mce-group[213406]-213406-1"
              />
              <label for="mce-group[213406]-213406-1">
                Pfarre Inzersdorf (St. Nikolaus)
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                value="4"
                name="group[213406][4]"
                id="mce-group[213406]-213406-2"
              />
              <label for="mce-group[213406]-213406-2">
                Pfarre Inzersdorf-Neustift
              </label>
            </div>
          </div>
          <div
            id="mergeRow-gdpr"
            class="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group"
          >
            <div class="content__gdpr">
              <label>Datenschutz</label>
              <p>Wie würden Sie gerne von uns informiert werden:</p>
              <fieldset
                class="mc_fieldset gdprRequired mc-field-group"
                name="interestgroup_field"
              >
                <label class="checkbox subfield" for="gdpr_70554">
                  <input
                    type="checkbox"
                    id="gdpr_70554"
                    name="gdpr[70554]"
                    value="Y"
                    class="av-checkbox gdpr"
                  />
                  <span>E-Mail</span>{" "}
                </label>
              </fieldset>
              <p>
                Sie können sich jederzeit vom Versand der E-Mails abmelden. Dies
                geht einfach mit einem Klick auf den Link am Ende des
                Newsletters. Für unsere weitere Datenschutzerklärung, besuchen
                Sie unsere Website.
              </p>
            </div>
            <div class="content__gdprLegal">
              <p>
                We use Mailchimp as our marketing platform. By clicking below to
                subscribe, you acknowledge that your information will be
                transferred to Mailchimp for processing.{" "}
                <a
                  href="https://mailchimp.com/legal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about Mailchimp's privacy practices here.
                </a>
              </p>
            </div>
          </div>
          <div id="mce-responses" class="clear">
            <div
              class="response"
              id="mce-error-response"
              style={{ display: "none" }}
            ></div>
            <div
              class="response"
              id="mce-success-response"
              style={{ display: "none" }}
            ></div>
          </div>
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_8b6f391cfa55dadcb0fb776fe_a735c113ed"
              tabindex="-1"
              value=""
            />
          </div>
          <div class="clear">
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              class="button"
            />
          </div>
        </div>
      </form>
    </div>
  </Box>
);
