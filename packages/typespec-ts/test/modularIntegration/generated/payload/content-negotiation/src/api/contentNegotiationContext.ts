// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { ContentNegotiationContext } from "../rest/index.js";
import getClient from "../rest/index.js";

/** Optional parameters for the client. */
export interface ContentNegotiationClientOptions extends ClientOptions {}

export { ContentNegotiationContext } from "../rest/index.js";

/** Test describing optionality of the request body. */
export function createContentNegotiation(
  options: ContentNegotiationClientOptions = {},
): ContentNegotiationContext {
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-modular-api`
    : "azsdk-js-modular-api";

  const clientContext = getClient({
    ...options,
    userAgentOptions: { userAgentPrefix },
  });
  return clientContext;
}
