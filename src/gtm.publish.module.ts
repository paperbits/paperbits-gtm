/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */


import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { GoogleTagManagerHtmlPagePublisherPlugin } from "./publishing";


/**
 * Google Tag Manager publishing module.
 */
export class GoogleTagManagerPublishModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindToCollectionAsSingletone("htmlPagePublisherPlugins", GoogleTagManagerHtmlPagePublisherPlugin);
    }
}