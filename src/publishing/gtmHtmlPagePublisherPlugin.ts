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

        const gtmConfigScriptElement = document.createElement("script");
        gtmConfigScriptElement.innerHTML = `
          window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${containerId}');`;
        document.head.insertAdjacentElement("afterbegin", gtmConfigScriptElement);

        const gtmScriptElement = document.createElement("script");
        gtmScriptElement.async = true;
        gtmScriptElement.src = `https://www.googletagmanager.com/gtag/js?id=${containerId}`;
        document.head.insertAdjacentElement("afterbegin", gtmScriptElement);
    }
}
