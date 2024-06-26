// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { BatchContext } from "../rest/index.js";
import getClient from "../rest/index.js";

/** Optional parameters for the client. */
export interface BatchClientOptions extends ClientOptions {}

export { BatchContext } from "../rest/index.js";

/** Azure Batch provides Cloud-scale job scheduling and compute management. */
export function createBatch(
  endpointParam: string,
  credential: TokenCredential,
  options: BatchClientOptions = {},
): BatchContext {
  const clientContext = getClient(endpointParam, credential, options);
  return clientContext;
}
