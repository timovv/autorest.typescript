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
  P2SVpnConnectionRequest,
  NetworkManagementClient
} from "@msinternal/network-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 *
 * @summary Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2021-05-01/examples/P2sVpnGatewaysDisconnectP2sVpnConnections.json
 */
async function disconnectVpnConnectionsFromP2SVpnGateway() {
  const subscriptionId = "subid";
  const resourceGroupName = "p2s-vpn-gateway-test";
  const p2SVpnGatewayName = "p2svpngateway";
  const request: P2SVpnConnectionRequest = {
    vpnConnectionIds: ["vpnconnId1", "vpnconnId2"]
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.beginDisconnectP2SVpnConnectionsAndWait(
    resourceGroupName,
    p2SVpnGatewayName,
    request
  );
  console.log(result);
}

disconnectVpnConnectionsFromP2SVpnGateway().catch(console.error);
