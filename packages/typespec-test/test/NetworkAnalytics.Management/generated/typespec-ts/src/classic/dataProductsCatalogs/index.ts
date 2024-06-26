// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NetworkAnalyticsContext } from "../../api/networkAnalyticsContext.js";
import { DataProductsCatalog } from "../../models/models.js";
import {
  get,
  listByResourceGroup,
  listBySubscription,
} from "../../api/dataProductsCatalogs/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import {
  DataProductsCatalogsGetOptionalParams,
  DataProductsCatalogsListByResourceGroupOptionalParams,
  DataProductsCatalogsListBySubscriptionOptionalParams,
} from "../../models/options.js";

export interface DataProductsCatalogsOperations {
  get: (
    resourceGroupName: string,
    options?: DataProductsCatalogsGetOptionalParams,
  ) => Promise<DataProductsCatalog>;
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DataProductsCatalogsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataProductsCatalog>;
  listBySubscription: (
    options?: DataProductsCatalogsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DataProductsCatalog>;
}

export function getDataProductsCatalogs(
  context: NetworkAnalyticsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      options?: DataProductsCatalogsGetOptionalParams,
    ) => get(context, subscriptionId, resourceGroupName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DataProductsCatalogsListByResourceGroupOptionalParams,
    ) =>
      listByResourceGroup(context, subscriptionId, resourceGroupName, options),
    listBySubscription: (
      options?: DataProductsCatalogsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, subscriptionId, options),
  };
}

export function getDataProductsCatalogsOperations(
  context: NetworkAnalyticsContext,
  subscriptionId: string,
): DataProductsCatalogsOperations {
  return {
    ...getDataProductsCatalogs(context, subscriptionId),
  };
}