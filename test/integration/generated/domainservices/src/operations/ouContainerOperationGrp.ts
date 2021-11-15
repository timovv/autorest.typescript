import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { OuContainerOperationGrp } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DomainServicesClientContext } from "../domainServicesClientContext";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  OuContainer,
  OuContainerListNextOptionalParams,
  OuContainerListOptionalParams,
  OuContainerListResponse,
  OuContainerGetOptionalParams,
  OuContainerGetResponse,
  ContainerAccount,
  OuContainerCreateOptionalParams,
  OuContainerCreateResponse,
  OuContainerDeleteOptionalParams,
  OuContainerUpdateOptionalParams,
  OuContainerUpdateResponse,
  OuContainerListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing OuContainerOperationGrp operations. */
export class OuContainerOperationGrpImpl implements OuContainerOperationGrp {
  private readonly client: DomainServicesClientContext;

  /**
   * Initialize a new instance of the class OuContainerOperationGrp class.
   * @param client Reference to the service client
   */
  constructor(client: DomainServicesClientContext) {
    this.client = client;
  }

  /**
   * The List of OuContainers in DomainService instance.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    domainServiceName: string,
    options?: OuContainerListOptionalParams
  ): PagedAsyncIterableIterator<OuContainer> {
    const iter = this.listPagingAll(
      resourceGroupName,
      domainServiceName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(
          resourceGroupName,
          domainServiceName,
          options
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    domainServiceName: string,
    options?: OuContainerListOptionalParams
  ): AsyncIterableIterator<OuContainer[]> {
    let result = await this._list(
      resourceGroupName,
      domainServiceName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        domainServiceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    domainServiceName: string,
    options?: OuContainerListOptionalParams
  ): AsyncIterableIterator<OuContainer> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      domainServiceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * The List of OuContainers in DomainService instance.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    domainServiceName: string,
    options?: OuContainerListOptionalParams
  ): Promise<OuContainerListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, domainServiceName, options },
      listOperationSpec
    );
  }

  /**
   * Get OuContainer in DomainService instance.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerGetOptionalParams
  ): Promise<OuContainerGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, domainServiceName, ouContainerName, options },
      getOperationSpec
    );
  }

  /**
   * The Create OuContainer operation creates a new OuContainer under the specified Domain Service
   * instance.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param containerAccount Container Account Description.
   * @param options The options parameters.
   */
  async beginCreate(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerCreateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<OuContainerCreateResponse>,
      OuContainerCreateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<OuContainerCreateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options
      },
      createOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * The Create OuContainer operation creates a new OuContainer under the specified Domain Service
   * instance.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param containerAccount Container Account Description.
   * @param options The options parameters.
   */
  async beginCreateAndWait(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerCreateOptionalParams
  ): Promise<OuContainerCreateResponse> {
    const poller = await this.beginCreate(
      resourceGroupName,
      domainServiceName,
      ouContainerName,
      containerAccount,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * The Delete OuContainer operation deletes specified OuContainer.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, domainServiceName, ouContainerName, options },
      deleteOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * The Delete OuContainer operation deletes specified OuContainer.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      domainServiceName,
      ouContainerName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * The Update OuContainer operation can be used to update the existing OuContainers.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param containerAccount Container Account Description.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<OuContainerUpdateResponse>,
      OuContainerUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<OuContainerUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options
      },
      updateOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * The Update OuContainer operation can be used to update the existing OuContainers.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param containerAccount Container Account Description.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerUpdateOptionalParams
  ): Promise<OuContainerUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      domainServiceName,
      ouContainerName,
      containerAccount,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    domainServiceName: string,
    nextLink: string,
    options?: OuContainerListNextOptionalParams
  ): Promise<OuContainerListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, domainServiceName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OuContainerListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainServiceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer/{ouContainerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OuContainer
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainServiceName,
    Parameters.ouContainerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer/{ouContainerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.OuContainer
    },
    201: {
      bodyMapper: Mappers.OuContainer
    },
    202: {
      bodyMapper: Mappers.OuContainer
    },
    204: {
      bodyMapper: Mappers.OuContainer
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.containerAccount,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainServiceName,
    Parameters.ouContainerName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer/{ouContainerName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainServiceName,
    Parameters.ouContainerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer/{ouContainerName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.OuContainer
    },
    201: {
      bodyMapper: Mappers.OuContainer
    },
    202: {
      bodyMapper: Mappers.OuContainer
    },
    204: {
      bodyMapper: Mappers.OuContainer
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.containerAccount,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainServiceName,
    Parameters.ouContainerName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OuContainerListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainServiceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};