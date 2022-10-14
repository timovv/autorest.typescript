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
  BlobContainersListOptionalParams,
  StorageManagementClient
} from "@msinternal/storage-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 *
 * @summary Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2021-06-01/examples/BlobContainersList.json
 */
async function listContainers() {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "res9290";
  const accountName = "sto1590";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.blobContainers.list(
    resourceGroupName,
    accountName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

listContainers().catch(console.error);

/**
 * This sample demonstrates how to Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 *
 * @summary Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2021-06-01/examples/DeletedBlobContainersList.json
 */
async function listDeletedContainers() {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "res9290";
  const accountName = "sto1590";
  const include = "deleted";
  const options: BlobContainersListOptionalParams = { include };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.blobContainers.list(
    resourceGroupName,
    accountName,
    options
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

listDeletedContainers().catch(console.error);