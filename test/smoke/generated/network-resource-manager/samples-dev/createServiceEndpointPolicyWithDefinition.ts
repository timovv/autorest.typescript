/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Creates or updates a service Endpoint Policies.
 *
 * @summary Creates or updates a service Endpoint Policies.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2021-05-01/examples/ServiceEndpointPolicyCreateWithDefinition.json
 */
import {
  ServiceEndpointPolicy,
  NetworkManagementClient
} from "@msinternal/network-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";

async function createServiceEndpointPolicyWithDefinition() {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const serviceEndpointPolicyName = "testPolicy";
  const parameters: ServiceEndpointPolicy = {
    location: "westus",
    serviceEndpointPolicyDefinitions: [
      {
        name: "StorageServiceEndpointPolicyDefinition",
        description: "Storage Service EndpointPolicy Definition",
        service: "Microsoft.Storage",
        serviceResources: [
          "/subscriptions/subid1",
          "/subscriptions/subid1/resourceGroups/storageRg",
          "/subscriptions/subid1/resourceGroups/storageRg/providers/Microsoft.Storage/storageAccounts/stAccount"
        ]
      }
    ]
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceEndpointPolicies.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceEndpointPolicyName,
    parameters
  );
  console.log(result);
}

createServiceEndpointPolicyWithDefinition().catch(console.error);