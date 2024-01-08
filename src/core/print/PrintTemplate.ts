import { PrintCss } from "./PrintStyles";
import { PRINT_LOGO_TEXT, PRINT_LOGO } from "../../constants";
import { GetPrintLogo, PrintLogoData } from "../utils/imageUtils";

export const GetPrintTemplate = (
  body: string,
  title: string | null | undefined,
  printOnLoad = false,
  closeAfterPrint = true
) => {
  return `<html>
<head>
<meta http-equiv=Content-Type content="text/html; charset=utf8">
<title>${title ?? ""}</title>
<style>
${PrintCss}
</style>
</head>
<body onload="${
    printOnLoad ? "window.print()" : ""
  }" style='word-wrap:break-word' ${
    closeAfterPrint ? 'onafterprint="self.close()"' : ""
  }>
    ${body}
</body>
</html>`;
};

export const GetLogoSection = async () => {
  let printLogoData: PrintLogoData | null = null;
  if (PRINT_LOGO) {
    try {
      printLogoData = await GetPrintLogo();
    } catch (e) {
      console.info(e);
    }
  }
  return printLogoData || PRINT_LOGO_TEXT
    ? `
<div class="logo" >
    ${
      printLogoData
        ? printLogoData.isSvg
          ? printLogoData.image
          : `<img alt='' src='${printLogoData.image}' />`
        : ""
    }
    ${
      PRINT_LOGO_TEXT
        ? `<span class='logo-text text'>${PRINT_LOGO_TEXT}</span>`
        : ""
    }
</div>    
    `
    : "";
};

export const GetHeaderSection = async () => {
  const logoSection = await GetLogoSection();
  return `
<div class="logo-row right">
${logoSection}
</div>    
    `;
};
