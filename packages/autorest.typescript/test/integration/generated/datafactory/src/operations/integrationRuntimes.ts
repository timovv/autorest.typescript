import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { IntegrationRuntimes } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DataFactoryClient } from "../dataFactoryClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  IntegrationRuntimeResource,
  IntegrationRuntimesListByFactoryNextOptionalParams,
  IntegrationRuntimesListByFactoryOptionalParams,
  IntegrationRuntimesListByFactoryResponse,
  IntegrationRuntimesCreateOrUpdateOptionalParams,
  IntegrationRuntimesCreateOrUpdateResponse,
  IntegrationRuntimesGetOptionalParams,
  IntegrationRuntimesGetResponse,
  UpdateIntegrationRuntimeRequest,
  IntegrationRuntimesUpdateOptionalParams,
  IntegrationRuntimesUpdateResponse,
  IntegrationRuntimesDeleteOptionalParams,
  IntegrationRuntimesGetStatusOptionalParams,
  IntegrationRuntimesGetStatusResponse,
  IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOptionalParams,
  IntegrationRuntimesListOutboundNetworkDependenciesEndpointsResponse,
  IntegrationRuntimesGetConnectionInfoOptionalParams,
  IntegrationRuntimesGetConnectionInfoResponse,
  IntegrationRuntimeRegenerateKeyParameters,
  IntegrationRuntimesRegenerateAuthKeyOptionalParams,
  IntegrationRuntimesRegenerateAuthKeyResponse,
  IntegrationRuntimesListAuthKeysOptionalParams,
  IntegrationRuntimesListAuthKeysResponse,
  IntegrationRuntimesStartOptionalParams,
  IntegrationRuntimesStartResponse,
  IntegrationRuntimesStopOptionalParams,
  IntegrationRuntimesSyncCredentialsOptionalParams,
  IntegrationRuntimesGetMonitoringDataOptionalParams,
  IntegrationRuntimesGetMonitoringDataResponse,
  IntegrationRuntimesUpgradeOptionalParams,
  LinkedIntegrationRuntimeRequest,
  IntegrationRuntimesRemoveLinksOptionalParams,
  CreateLinkedIntegrationRuntimeRequest,
  IntegrationRuntimesCreateLinkedIntegrationRuntimeOptionalParams,
  IntegrationRuntimesCreateLinkedIntegrationRuntimeResponse,
  IntegrationRuntimesListByFactoryNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing IntegrationRuntimes operations. */
export class IntegrationRuntimesImpl implements IntegrationRuntimes {
  private readonly client: DataFactoryClient;

  /**
   * Initialize a new instance of the class IntegrationRuntimes class.
   * @param client Reference to the service client
   */
  constructor(client: DataFactoryClient) {
    this.client = client;
  }

  /**
   * Lists integration runtimes.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param options The options parameters.
   */
  public listByFactory(
    resourceGroupName: string,
    factoryName: string,
    options?: IntegrationRuntimesListByFactoryOptionalParams,
  ): PagedAsyncIterableIterator<IntegrationRuntimeResource> {
    const iter = this.listByFactoryPagingAll(
      resourceGroupName,
      factoryName,
      options,
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByFactoryPagingPage(
          resourceGroupName,
          factoryName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByFactoryPagingPage(
    resourceGroupName: string,
    factoryName: string,
    options?: IntegrationRuntimesListByFactoryOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<IntegrationRuntimeResource[]> {
    let result: IntegrationRuntimesListByFactoryResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByFactory(
        resourceGroupName,
        factoryName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByFactoryNext(
        resourceGroupName,
        factoryName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByFactoryPagingAll(
    resourceGroupName: string,
    factoryName: string,
    options?: IntegrationRuntimesListByFactoryOptionalParams,
  ): AsyncIterableIterator<IntegrationRuntimeResource> {
    for await (const page of this.listByFactoryPagingPage(
      resourceGroupName,
      factoryName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Lists integration runtimes.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param options The options parameters.
   */
  private _listByFactory(
    resourceGroupName: string,
    factoryName: string,
    options?: IntegrationRuntimesListByFactoryOptionalParams,
  ): Promise<IntegrationRuntimesListByFactoryResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, options },
      listByFactoryOperationSpec,
    );
  }

  /**
   * Creates or updates an integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param integrationRuntime Integration runtime resource definition.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    integrationRuntime: IntegrationRuntimeResource,
    options?: IntegrationRuntimesCreateOrUpdateOptionalParams,
  ): Promise<IntegrationRuntimesCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        integrationRuntime,
        options,
      },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Gets an integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesGetOptionalParams,
  ): Promise<IntegrationRuntimesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, integrationRuntimeName, options },
      getOperationSpec,
    );
  }

  /**
   * Updates an integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param updateIntegrationRuntimeRequest The parameters for updating an integration runtime.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    updateIntegrationRuntimeRequest: UpdateIntegrationRuntimeRequest,
    options?: IntegrationRuntimesUpdateOptionalParams,
  ): Promise<IntegrationRuntimesUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        updateIntegrationRuntimeRequest,
        options,
      },
      updateOperationSpec,
    );
  }

  /**
   * Deletes an integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, integrationRuntimeName, options },
      deleteOperationSpec,
    );
  }

  /**
   * Gets detailed status information for an integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  getStatus(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesGetStatusOptionalParams,
  ): Promise<IntegrationRuntimesGetStatusResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, integrationRuntimeName, options },
      getStatusOperationSpec,
    );
  }

  /**
   * Gets the list of outbound network dependencies for a given Azure-SSIS integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  listOutboundNetworkDependenciesEndpoints(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOptionalParams,
  ): Promise<IntegrationRuntimesListOutboundNetworkDependenciesEndpointsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, integrationRuntimeName, options },
      listOutboundNetworkDependenciesEndpointsOperationSpec,
    );
  }

  /**
   * Gets the on-premises integration runtime connection information for encrypting the on-premises data
   * source credentials.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  getConnectionInfo(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesGetConnectionInfoOptionalParams,
  ): Promise<IntegrationRuntimesGetConnectionInfoResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, integrationRuntimeName, options },
      getConnectionInfoOperationSpec,
    );
  }

  /**
   * Regenerates the authentication key for an integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param regenerateKeyParameters The parameters for regenerating integration runtime authentication
   *                                key.
   * @param options The options parameters.
   */
  regenerateAuthKey(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    regenerateKeyParameters: IntegrationRuntimeRegenerateKeyParameters,
    options?: IntegrationRuntimesRegenerateAuthKeyOptionalParams,
  ): Promise<IntegrationRuntimesRegenerateAuthKeyResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        regenerateKeyParameters,
        options,
      },
      regenerateAuthKeyOperationSpec,
    );
  }

  /**
   * Retrieves the authentication keys for an integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  listAuthKeys(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesListAuthKeysOptionalParams,
  ): Promise<IntegrationRuntimesListAuthKeysResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, integrationRuntimeName, options },
      listAuthKeysOperationSpec,
    );
  }

  /**
   * Starts a ManagedReserved type integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  async beginStart(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesStartOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<IntegrationRuntimesStartResponse>,
      IntegrationRuntimesStartResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<IntegrationRuntimesStartResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, factoryName, integrationRuntimeName, options },
      spec: startOperationSpec,
    });
    const poller = await createHttpPoller<
      IntegrationRuntimesStartResponse,
      OperationState<IntegrationRuntimesStartResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Starts a ManagedReserved type integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  async beginStartAndWait(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesStartOptionalParams,
  ): Promise<IntegrationRuntimesStartResponse> {
    const poller = await this.beginStart(
      resourceGroupName,
      factoryName,
      integrationRuntimeName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Stops a ManagedReserved type integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  async beginStop(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesStopOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, factoryName, integrationRuntimeName, options },
      spec: stopOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Stops a ManagedReserved type integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  async beginStopAndWait(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesStopOptionalParams,
  ): Promise<void> {
    const poller = await this.beginStop(
      resourceGroupName,
      factoryName,
      integrationRuntimeName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Force the integration runtime to synchronize credentials across integration runtime nodes, and this
   * will override the credentials across all worker nodes with those available on the dispatcher node.
   * If you already have the latest credential backup file, you should manually import it (preferred) on
   * any self-hosted integration runtime node than using this API directly.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  syncCredentials(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesSyncCredentialsOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, integrationRuntimeName, options },
      syncCredentialsOperationSpec,
    );
  }

  /**
   * Get the integration runtime monitoring data, which includes the monitor data for all the nodes under
   * this integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  getMonitoringData(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesGetMonitoringDataOptionalParams,
  ): Promise<IntegrationRuntimesGetMonitoringDataResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, integrationRuntimeName, options },
      getMonitoringDataOperationSpec,
    );
  }

  /**
   * Upgrade self-hosted integration runtime to latest version if availability.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param options The options parameters.
   */
  upgrade(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesUpgradeOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, integrationRuntimeName, options },
      upgradeOperationSpec,
    );
  }

  /**
   * Remove all linked integration runtimes under specific data factory in a self-hosted integration
   * runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param linkedIntegrationRuntimeRequest The data factory name for the linked integration runtime.
   * @param options The options parameters.
   */
  removeLinks(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    linkedIntegrationRuntimeRequest: LinkedIntegrationRuntimeRequest,
    options?: IntegrationRuntimesRemoveLinksOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        linkedIntegrationRuntimeRequest,
        options,
      },
      removeLinksOperationSpec,
    );
  }

  /**
   * Create a linked integration runtime entry in a shared integration runtime.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param integrationRuntimeName The integration runtime name.
   * @param createLinkedIntegrationRuntimeRequest The linked integration runtime properties.
   * @param options The options parameters.
   */
  createLinkedIntegrationRuntime(
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    createLinkedIntegrationRuntimeRequest: CreateLinkedIntegrationRuntimeRequest,
    options?: IntegrationRuntimesCreateLinkedIntegrationRuntimeOptionalParams,
  ): Promise<IntegrationRuntimesCreateLinkedIntegrationRuntimeResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        createLinkedIntegrationRuntimeRequest,
        options,
      },
      createLinkedIntegrationRuntimeOperationSpec,
    );
  }

  /**
   * ListByFactoryNext
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param nextLink The nextLink from the previous successful call to the ListByFactory method.
   * @param options The options parameters.
   */
  private _listByFactoryNext(
    resourceGroupName: string,
    factoryName: string,
    nextLink: string,
    options?: IntegrationRuntimesListByFactoryNextOptionalParams,
  ): Promise<IntegrationRuntimesListByFactoryNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, factoryName, nextLink, options },
      listByFactoryNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByFactoryOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeListResponse,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeResource,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.integrationRuntime,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch,
  ],
  mediaType: "json",
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeResource,
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeResource,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.updateIntegrationRuntimeRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getStatusOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/getStatus",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeStatusResponse,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listOutboundNetworkDependenciesEndpointsOperationSpec: coreClient.OperationSpec =
  {
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/outboundNetworkDependenciesEndpoints",
    httpMethod: "GET",
    responses: {
      200: {
        bodyMapper:
          Mappers.IntegrationRuntimeOutboundNetworkDependenciesEndpointsResponse,
      },
      default: {
        bodyMapper: Mappers.CloudError,
      },
    },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [
      Parameters.$host,
      Parameters.subscriptionId,
      Parameters.resourceGroupName,
      Parameters.factoryName,
      Parameters.integrationRuntimeName,
    ],
    headerParameters: [Parameters.accept],
    serializer,
  };
const getConnectionInfoOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/getConnectionInfo",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeConnectionInfo,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const regenerateAuthKeyOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/regenerateAuthKey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeAuthKeys,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.regenerateKeyParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listAuthKeysOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/listAuthKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeAuthKeys,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const startOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/start",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeStatusResponse,
    },
    201: {
      bodyMapper: Mappers.IntegrationRuntimeStatusResponse,
    },
    202: {
      bodyMapper: Mappers.IntegrationRuntimeStatusResponse,
    },
    204: {
      bodyMapper: Mappers.IntegrationRuntimeStatusResponse,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const stopOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/stop",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const syncCredentialsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/syncCredentials",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getMonitoringDataOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/monitoringData",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeMonitoringData,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const upgradeOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/upgrade",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const removeLinksOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/removeLinks",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.linkedIntegrationRuntimeRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const createLinkedIntegrationRuntimeOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/linkedIntegrationRuntime",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeStatusResponse,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.createLinkedIntegrationRuntimeRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.integrationRuntimeName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listByFactoryNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeListResponse,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
