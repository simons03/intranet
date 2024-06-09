import {
  LayoutBlockVariation,
  LogoColor,
  LogoVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiLayoutBlock,
  DigiLogo,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

export default function Header() {
  return (
    <header>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.TRANSPARENT}>
        <div className="container d-flex ">
          <DigiLogo
            afVariation={LogoVariation.LARGE}
            afColor={LogoColor.PRIMARY}
          />
          <ul className="d-flex">
            <li className="login d-flex">
              <digi-icon-user-alt
                style={{ height: "15px", width: "15px" }}
              />
              <DigiTypography>
                <h4
                  style={{
                    cursor: "pointer",
                    padding: 0,
                    margin: 0,
                    marginLeft: "0.4rem",
                  }}
                >
                  Logga in
                </h4>
              </DigiTypography>
            </li>
            <li className="login d-flex">
              <digi-icon-language-outline
                style={{ height: "25px", width: "25px" }}
              />
              <DigiTypography>
                <h4
                  style={{
                    cursor: "pointer",
                    padding: 0,
                    margin: 0,
                    marginLeft: "0.4rem",
                  }}
                >
                  Outer languages
                </h4>
              </DigiTypography>
            </li>
          </ul>
        </div>
      </DigiLayoutBlock>
    </header>
  );
}
