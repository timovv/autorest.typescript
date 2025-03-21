// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createAzureAgriFoodPlatformDataPlaneServiceClient from "@msinternal/agrifood-data-plane";
import { AzureKeyCredential } from "@azure/core-auth";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a specified season resource.
 *
 * @summary Gets a specified season resource.
 * x-ms-original-file: specification/agrifood/data-plane/Microsoft.AgFoodPlatform/preview/2021-03-31-preview/examples/Seasons_Get.json
 */
async function seasonsGet(): Promise<void> {
  const endpoint = "{Endpoint}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createAzureAgriFoodPlatformDataPlaneServiceClient(
    endpoint,
    credential,
  );
  const seasonId = "SEASON123";
  const result = await client.path("/seasons/{seasonId}", seasonId).get();
  console.log(result);
}

async function main(): Promise<void> {
  await seasonsGet();
}

main().catch(console.error);
