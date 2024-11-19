/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  LogicalDatabaseTransparentDataEncryption,
  SqlManagementClient,
} from "@msinternal/sql-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates a logical database's transparent data encryption configuration.
 *
 * @summary Updates a logical database's transparent data encryption configuration.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-02-01-preview/examples/TransparentDataEncryptionUpdate.json
 */
async function updateADatabaseTransparentDataEncryptionStateWithMinimalParameters() {
  const subscriptionId =
    process.env["SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["RESOURCE_GROUP"] || "securitytde-42-rg";
  const serverName = "securitytde-42";
  const databaseName = "testdb";
  const tdeName = "current";
  const parameters: LogicalDatabaseTransparentDataEncryption = {
    state: "Enabled",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.transparentDataEncryptions.createOrUpdate(
    resourceGroupName,
    serverName,
    databaseName,
    tdeName,
    parameters,
  );
  console.log(result);
}

async function main() {
  updateADatabaseTransparentDataEncryptionStateWithMinimalParameters();
}

main().catch(console.error);
