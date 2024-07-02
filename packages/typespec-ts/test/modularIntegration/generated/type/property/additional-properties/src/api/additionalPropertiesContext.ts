// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { AdditionalPropertiesContext } from "../rest/index.js";
import getClient from "../rest/index.js";

/** Optional parameters for the client. */
export interface AdditionalPropertiesClientOptions extends ClientOptions {}

export { AdditionalPropertiesContext } from "../rest/index.js";

/** Tests for additional properties of models */
export function createAdditionalProperties(
  options: AdditionalPropertiesClientOptions = {},
): AdditionalPropertiesContext {
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
