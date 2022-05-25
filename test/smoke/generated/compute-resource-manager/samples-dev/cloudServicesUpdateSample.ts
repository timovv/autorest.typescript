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
  CloudServiceUpdate,
  CloudServicesUpdateOptionalParams,
  ComputeManagementClient
} from "@msinternal/compute-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Update a cloud service.
 *
 * @summary Update a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2021-03-01/examples/UpdateCloudServiceToIncludeTags.json
 */
async function updateExistingCloudServiceToAddTags() {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const parameters: CloudServiceUpdate = { tags: { documentation: "RestAPI" } };
  const options: CloudServicesUpdateOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServices.beginUpdateAndWait(
    resourceGroupName,
    cloudServiceName,
    options
  );
  console.log(result);
}

updateExistingCloudServiceToAddTags().catch(console.error);
