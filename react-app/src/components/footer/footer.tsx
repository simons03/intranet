import {
  FooterCardVariation,
  FooterVariation,
  LogoColor,
  LogoVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiFooter,
  DigiFooterCard,
  DigiIconAccessibilityUniversal,
  DigiIconEnvelope,
  DigiIconGlobe,
  DigiIconSign,
  DigiLogo,
} from "@digi/arbetsformedlingen-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <DigiFooter afVariation={FooterVariation.SMALL}>
      <div slot="content-top" className="container">
        <div>
          <DigiFooterCard afType={FooterCardVariation.ICON}>
            <ul>
              <li>
                <a href="/404">
                  <DigiIconAccessibilityUniversal></DigiIconAccessibilityUniversal>
                  Tillgänglighetsredogörelse
                </a>
              </li>
              <li>
                <a href="/404">
                  <DigiIconSign></DigiIconSign>
                  Teckenspråk
                </a>
              </li>
              <li>
                <a href="/404">
                  <DigiIconGlobe></DigiIconGlobe>
                  Other languages
                </a>
              </li>
              <li>
                <a href="/404">
                  <DigiIconEnvelope></DigiIconEnvelope>
                  Mejla vår funktionbrevlåda
                </a>
              </li>
            </ul>
          </DigiFooterCard>
        </div>
        <div>
          <DigiFooterCard afType={FooterCardVariation.BORDER}>
            <a href="/404">Om tjänsten frontendutvecklare</a>
            <p>
              Systemversion: 1.4.0 <br /> Ansvarig: Jenny Svensson
            </p>
          </DigiFooterCard>
        </div>
        <div>
          <DigiFooterCard afType={FooterCardVariation.BORDER}>
            <a href="/404">Kontakta oss</a>
            <p>
              Telefon: 0771-60 0001 <br /> Öppettider: Vardagar 08:00-16:30
            </p>
          </DigiFooterCard>
        </div>
      </div>
      <div slot="content-bottom-left">
        <Link to="/">
          <DigiLogo
            afVariation={LogoVariation.LARGE}
            afColor={LogoColor.SECONDARY}
          ></DigiLogo>
        </Link>
      </div>
      <div slot="content-bottom-right">
        <p>Följ oss på</p>
        <a href="/404">Facebook</a>
        <a href="/404">Youtube</a>
        <a href="/404">Linkedin</a>
        <a href="/404">Instagram</a>
      </div>
    </DigiFooter>
  );
}
