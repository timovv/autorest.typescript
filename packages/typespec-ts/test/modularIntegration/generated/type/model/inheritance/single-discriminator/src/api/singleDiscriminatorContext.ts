// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { SingleDiscriminatorContext } from "../rest/index.js";
import getClient from "../rest/index.js";

/** Optional parameters for the client. */
export interface SingleDiscriminatorClientOptions extends ClientOptions {}

export { SingleDiscriminatorContext } from "../rest/index.js";

/** Illustrates inheritance with single discriminator. */
export function createSingleDiscriminator(
  options: SingleDiscriminatorClientOptions = {},
): SingleDiscriminatorContext {
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
