// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createBodyStringRestClient from "@msinternal/body-string-rest";
import "dotenv/config";

/**
 * This sample demonstrates how to Get empty string value value ''
 *
 * @summary Get empty string value value ''
 * x-ms-original-file: /@microsoft.azure/autorest.testserver/swagger/examples/string_getEmpty.json
 */
async function stringGetEmpty(): Promise<void> {
  const client = createBodyStringRestClient();
  const result = await client.path("/string/empty").get();
  console.log(result);
}

async function main(): Promise<void> {
  await stringGetEmpty();
}

main().catch(console.error);
