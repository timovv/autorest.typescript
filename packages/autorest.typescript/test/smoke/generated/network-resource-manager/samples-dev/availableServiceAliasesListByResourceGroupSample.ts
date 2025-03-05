/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { NetworkManagementClient } from "@msinternal/network-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all available service aliases for this resource group in this region.
 *
 * @summary Gets all available service aliases for this resource group in this region.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-07-01/examples/AvailableServiceAliasesListByResourceGroup.json
 */
async function getAvailableServiceAliasesInTheResourceGroup(): Promise<void> {
  const subscriptionId = process.env["SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["RESOURCE_GROUP"] || "rg1";
  const location = "westcentralus";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableServiceAliases.listByResourceGroup(
    resourceGroupName,
    location,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAvailableServiceAliasesInTheResourceGroup();
}

main().catch(console.error);
