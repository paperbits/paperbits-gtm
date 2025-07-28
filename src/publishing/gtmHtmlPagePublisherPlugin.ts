import { HtmlPagePublisherPlugin } from "@paperbits/common/publishing";
import { ISiteService } from "@paperbits/common/sites";
import { GoogleTagManagerSettings } from "./gtmSettings";


export class GoogleTagManagerHtmlPagePublisherPlugin implements HtmlPagePublisherPlugin {
    constructor(private readonly siteService: ISiteService) { }

    public async apply(document: Document): Promise<void> {
        const settings = await this.siteService.getSettings<any>();
        const gtmSettings: GoogleTagManagerSettings = settings?.integration?.googleTagManager;

        if (!gtmSettings) {
            return;
        }

        const containerId = gtmSettings.webContainerId || gtmSettings.containerId;

        if (!containerId) {
            return;
        }

        const headScriptElement = document.createElement("script");

        headScriptElement.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`;
        document.head.insertAdjacentElement("afterbegin", headScriptElement);

        const bodyScriptElement = document.createElement("noscript");
        bodyScriptElement.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertAdjacentElement("afterbegin", bodyScriptElement);
    }
}