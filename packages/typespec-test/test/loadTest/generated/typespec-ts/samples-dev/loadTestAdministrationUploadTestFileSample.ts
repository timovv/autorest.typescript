// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createAzureLoadTestingClient from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation UploadTestFile
 *
 * @summary call operation UploadTestFile
 */
async function loadTestAdministrationUploadTestFileSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new DefaultAzureCredential();
  const client = createAzureLoadTestingClient(endpointParam, credential);
  const testId = "{Your testId}";
  const fileName = "{Your fileName}";
  const result = await client
    .path("/tests/{testId}/files/{fileName}", testId, fileName)
    .put({
      body: "{Your body}",
      queryParameters: { fileType: "JMX_FILE" },
      contentType: "application/octet-stream",
    });
  console.log(result);
}

async function main(): Promise<void> {
  await loadTestAdministrationUploadTestFileSample();
}

main().catch(console.error);
