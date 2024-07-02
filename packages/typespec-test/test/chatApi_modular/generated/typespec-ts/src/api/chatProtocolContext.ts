// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { ChatProtocolContext } from "../rest/index.js";
import getClient from "../rest/index.js";

/** Optional parameters for the client. */
export interface ChatProtocolClientOptions extends ClientOptions {}

export { ChatProtocolContext } from "../rest/index.js";

/** Azure APIs for the Azure Chat protocol. */
export function createChatProtocol(
  endpointParam: string,
  credential: KeyCredential | TokenCredential,
  options: ChatProtocolClientOptions = {},
): ChatProtocolContext {
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-modular-api`
    : "azsdk-js-modular-api";

  const clientContext = getClient(endpointParam, credential, {
    ...options,
    userAgentOptions: { userAgentPrefix },
  });
  return clientContext;
}
