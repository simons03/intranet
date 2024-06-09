import { ErrorPageStatusCodes } from "@digi/arbetsformedlingen";
import {
  DigiLinkInternal,
  DigiNotificationErrorPage,
} from "@digi/arbetsformedlingen-react";
import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export default function MissingPage() {
  return (
    <div>
      <Header />

      <DigiNotificationErrorPage
        afHttpStatusCode={ErrorPageStatusCodes.UNAUTHORIZED}
      >
        <ul slot="links">
          <li>
            <DigiLinkInternal afHref="/" afVariation="small">
              Gå tillbaka till föregående sida
            </DigiLinkInternal>
          </li>
          <li>
            <DigiLinkInternal afHref="/" afVariation="small">
              Till startsidan
            </DigiLinkInternal>
          </li>
        </ul>
      </DigiNotificationErrorPage>
      <Footer />
    </div>
  );
}
