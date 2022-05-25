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

/**
 * This sample demonstrates how to Gets all network security groups applied to a network interface.
 *
 * @summary Gets all network security groups applied to a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2021-05-01/examples/NetworkInterfaceEffectiveNSGList.json
 */
async function listNetworkInterfaceEffectiveNetworkSecurityGroups() {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const networkInterfaceName = "nic1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.beginListEffectiveNetworkSecurityGroupsAndWait(
    resourceGroupName,
    networkInterfaceName
  );
  console.log(result);
}

listNetworkInterfaceEffectiveNetworkSecurityGroups().catch(console.error);
