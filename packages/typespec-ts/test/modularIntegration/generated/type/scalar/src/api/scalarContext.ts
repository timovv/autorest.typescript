// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { ScalarContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface ScalarClientOptions extends ClientOptions {}

export { ScalarContext } from "../rest/index.js";

export function createScalar(options: ScalarClientOptions = {}): ScalarContext {
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
