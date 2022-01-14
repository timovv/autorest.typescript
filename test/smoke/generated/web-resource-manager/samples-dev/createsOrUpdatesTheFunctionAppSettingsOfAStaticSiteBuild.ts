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
 * This sample demonstrates how to Description for Creates or updates the function app settings of a static site build.
 *
 * @summary Description for Creates or updates the function app settings of a static site build.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-02-01/examples/CreateOrUpdateStaticSiteBuildFunctionAppSettings.json
 */
import {
  StringDictionary,
  WebSiteManagementClient
} from "@msinternal/web-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";

async function createsOrUpdatesTheFunctionAppSettingsOfAStaticSiteBuild() {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "rg";
  const name = "testStaticSite0";
  const environmentName = "12";
  const appSettings: StringDictionary = {
    properties: { setting1: "someval", setting2: "someval2" }
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.createOrUpdateStaticSiteBuildFunctionAppSettings(
    resourceGroupName,
    name,
    environmentName,
    appSettings
  );
  console.log(result);
}

createsOrUpdatesTheFunctionAppSettingsOfAStaticSiteBuild().catch(console.error);