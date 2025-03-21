// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createAzureAgriFoodPlatformDataPlaneServiceClient from "@msinternal/agrifood-data-plane";
import { AzureKeyCredential } from "@azure/core-auth";
import "dotenv/config";

/**
 * This sample demonstrates how to Get weather data delete job.
 *
 * @summary Get weather data delete job.
 * x-ms-original-file: specification/agrifood/data-plane/Microsoft.AgFoodPlatform/preview/2021-03-31-preview/examples/Weather_GetDataDeleteJobDetails.json
 */
async function weatherGetDataDeleteJobDetails(): Promise<void> {
  const endpoint = "{Endpoint}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createAzureAgriFoodPlatformDataPlaneServiceClient(
    endpoint,
    credential,
  );
  const jobId = "JOB123";
  const result = await client.path("/weather/delete-data/{jobId}", jobId).get();
  console.log(result);
}

async function main(): Promise<void> {
  await weatherGetDataDeleteJobDetails();
}

main().catch(console.error);
