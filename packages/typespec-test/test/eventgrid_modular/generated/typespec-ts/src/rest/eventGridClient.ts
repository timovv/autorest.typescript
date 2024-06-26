// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "../logger.js";
import { KeyCredential } from "@azure/core-auth";
import { EventGridContext } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `EventGridContext`
 * @param endpointParam - The host name of the namespace, e.g. namespaceName1.westus-1.eventgrid.azure.net
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: KeyCredential,
  options: ClientOptions = {},
): EventGridContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}`;
  options.apiVersion = options.apiVersion ?? "2023-06-01-preview";
  const userAgentInfo = `azsdk-js-eventgrid-modular/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      apiKeyHeaderName:
        options.credentials?.apiKeyHeaderName ?? "SharedAccessKey",
    },
  };

  const client = getClient(
    endpointUrl,
    credentials,
    options,
  ) as EventGridContext;

  return client;
}
