// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createAzureLoadTestingClient from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation GetServerMetricsConfig
 *
 * @summary call operation GetServerMetricsConfig
 */
async function loadTestAdministrationGetServerMetricsConfigSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new DefaultAzureCredential();
  const client = createAzureLoadTestingClient(endpointParam, credential);
  const testId = "{Your testId}";
  const result = await client
    .path("/tests/{testId}/server-metrics-config", testId)
    .get();
  console.log(result);
}

async function main(): Promise<void> {
  await loadTestAdministrationGetServerMetricsConfigSample();
}

main().catch(console.error);
