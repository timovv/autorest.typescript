// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  multivariateAlignPolicySerializer,
  multivariateDiagnosticsInfoSerializer,
  multivariateVariableValuesSerializer,
  MultivariateMultivariateDetectionResult,
  MultivariateMultivariateBatchDetectionOptions,
  MultivariateModelInfo,
  MultivariateAnomalyDetectionModel,
  MultivariateMultivariateLastDetectionOptions,
  MultivariateMultivariateLastDetectionResult,
  _MultivariateModelList,
} from "../../models/models.js";
import { AnomalyDetectorContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  MultivariateGetMultivariateBatchDetectionResultOptionalParams,
  MultivariateTrainMultivariateModelOptionalParams,
  MultivariateListMultivariateModelsOptionalParams,
  MultivariateDeleteMultivariateModelOptionalParams,
  MultivariateGetMultivariateModelOptionalParams,
  MultivariateDetectMultivariateBatchAnomalyOptionalParams,
  MultivariateDetectMultivariateLastAnomalyOptionalParams,
} from "../../models/options.js";

export function _getMultivariateBatchDetectionResultSend(
  context: Client,
  resultId: string,
  options: MultivariateGetMultivariateBatchDetectionResultOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/multivariate/detect-batch/{resultId}", resultId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getMultivariateBatchDetectionResultDeserialize(
  result: PathUncheckedResponse,
): Promise<MultivariateMultivariateDetectionResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    resultId: result.body["resultId"],
    summary: {
      status: result.body.summary["status"],
      errors:
        result.body.summary["errors"] === undefined
          ? result.body.summary["errors"]
          : result.body.summary["errors"].map((p: any) => {
              return { code: p["code"], message: p["message"] };
            }),
      variableStates:
        result.body.summary["variableStates"] === undefined
          ? result.body.summary["variableStates"]
          : result.body.summary["variableStates"].map((p: any) => {
              return {
                variable: p["variable"],
                filledNARatio: p["filledNARatio"],
                effectiveCount: p["effectiveCount"],
                firstTimestamp:
                  p["firstTimestamp"] !== undefined
                    ? new Date(p["firstTimestamp"])
                    : undefined,
                lastTimestamp:
                  p["lastTimestamp"] !== undefined
                    ? new Date(p["lastTimestamp"])
                    : undefined,
              };
            }),
      setupInfo: {
        dataSource: result.body.summary.setupInfo["dataSource"],
        topContributorCount:
          result.body.summary.setupInfo["topContributorCount"],
        startTime: new Date(result.body.summary.setupInfo["startTime"]),
        endTime: new Date(result.body.summary.setupInfo["endTime"]),
      },
    },
    results: result.body["results"].map((p: any) => {
      return {
        timestamp: new Date(p["timestamp"]),
        value: !p.value
          ? undefined
          : {
              isAnomaly: p.value?.["isAnomaly"],
              severity: p.value?.["severity"],
              score: p.value?.["score"],
              interpretation:
                p.value?.["interpretation"] === undefined
                  ? p.value?.["interpretation"]
                  : p.value?.["interpretation"].map((p: any) => {
                      return {
                        variable: p["variable"],
                        contributionScore: p["contributionScore"],
                        correlationChanges: !p.correlationChanges
                          ? undefined
                          : {
                              changedVariables:
                                p.correlationChanges?.["changedVariables"],
                            },
                      };
                    }),
            },
        errors:
          p["errors"] === undefined
            ? p["errors"]
            : p["errors"].map((p: any) => {
                return { code: p["code"], message: p["message"] };
              }),
      };
    }),
  };
}

/**
 * For asynchronous inference, get multivariate anomaly detection result based on
 * resultId returned by the BatchDetectAnomaly api.
 */
export async function getMultivariateBatchDetectionResult(
  context: Client,
  resultId: string,
  options: MultivariateGetMultivariateBatchDetectionResultOptionalParams = {
    requestOptions: {},
  },
): Promise<MultivariateMultivariateDetectionResult> {
  const result = await _getMultivariateBatchDetectionResultSend(
    context,
    resultId,
    options,
  );
  return _getMultivariateBatchDetectionResultDeserialize(result);
}

export function _trainMultivariateModelSend(
  context: Client,
  modelInfo: MultivariateModelInfo,
  options: MultivariateTrainMultivariateModelOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/multivariate/models")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        dataSource: modelInfo["dataSource"],
        dataSchema: modelInfo["dataSchema"],
        startTime: modelInfo["startTime"].toISOString(),
        endTime: modelInfo["endTime"].toISOString(),
        displayName: modelInfo["displayName"],
        slidingWindow: modelInfo["slidingWindow"],
        alignPolicy: !modelInfo.alignPolicy
          ? modelInfo.alignPolicy
          : multivariateAlignPolicySerializer(modelInfo.alignPolicy),
        status: modelInfo["status"],
        diagnosticsInfo: !modelInfo.diagnosticsInfo
          ? modelInfo.diagnosticsInfo
          : multivariateDiagnosticsInfoSerializer(modelInfo.diagnosticsInfo),
      },
    });
}

export async function _trainMultivariateModelDeserialize(
  result: PathUncheckedResponse,
): Promise<MultivariateAnomalyDetectionModel> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    modelId: result.body["modelId"],
    createdTime: new Date(result.body["createdTime"]),
    lastUpdatedTime: new Date(result.body["lastUpdatedTime"]),
    modelInfo: !result.body.modelInfo
      ? undefined
      : {
          dataSource: result.body.modelInfo?.["dataSource"],
          dataSchema: result.body.modelInfo?.["dataSchema"],
          startTime: new Date(result.body.modelInfo?.["startTime"]),
          endTime: new Date(result.body.modelInfo?.["endTime"]),
          displayName: result.body.modelInfo?.["displayName"],
          slidingWindow: result.body.modelInfo?.["slidingWindow"],
          alignPolicy: !result.body.modelInfo?.alignPolicy
            ? undefined
            : {
                alignMode: result.body.modelInfo?.alignPolicy?.["alignMode"],
                fillNAMethod:
                  result.body.modelInfo?.alignPolicy?.["fillNAMethod"],
                paddingValue:
                  result.body.modelInfo?.alignPolicy?.["paddingValue"],
              },
          status: result.body.modelInfo?.["status"],
          errors:
            result.body.modelInfo?.["errors"] === undefined
              ? result.body.modelInfo?.["errors"]
              : result.body.modelInfo?.["errors"].map((p: any) => {
                  return { code: p["code"], message: p["message"] };
                }),
          diagnosticsInfo: !result.body.modelInfo?.diagnosticsInfo
            ? undefined
            : {
                modelState: !result.body.modelInfo?.diagnosticsInfo?.modelState
                  ? undefined
                  : {
                      epochIds:
                        result.body.modelInfo?.diagnosticsInfo?.modelState?.[
                          "epochIds"
                        ],
                      trainLosses:
                        result.body.modelInfo?.diagnosticsInfo?.modelState?.[
                          "trainLosses"
                        ],
                      validationLosses:
                        result.body.modelInfo?.diagnosticsInfo?.modelState?.[
                          "validationLosses"
                        ],
                      latenciesInSeconds:
                        result.body.modelInfo?.diagnosticsInfo?.modelState?.[
                          "latenciesInSeconds"
                        ],
                    },
                variableStates:
                  result.body.modelInfo?.diagnosticsInfo?.["variableStates"] ===
                  undefined
                    ? result.body.modelInfo?.diagnosticsInfo?.["variableStates"]
                    : result.body.modelInfo?.diagnosticsInfo?.[
                        "variableStates"
                      ].map((p: any) => {
                        return {
                          variable: p["variable"],
                          filledNARatio: p["filledNARatio"],
                          effectiveCount: p["effectiveCount"],
                          firstTimestamp:
                            p["firstTimestamp"] !== undefined
                              ? new Date(p["firstTimestamp"])
                              : undefined,
                          lastTimestamp:
                            p["lastTimestamp"] !== undefined
                              ? new Date(p["lastTimestamp"])
                              : undefined,
                        };
                      }),
              },
        },
  };
}

/**
 * Create and train a multivariate anomaly detection model. The request must
 * include a source parameter to indicate an externally accessible Azure blob
 * storage URI.There are two types of data input: An URI pointed to an Azure blob
 * storage folder which contains multiple CSV files, and each CSV file contains
 * two columns, timestamp and variable. Another type of input is an URI pointed to
 * a CSV file in Azure blob storage, which contains all the variables and a
 * timestamp column.
 */
export async function trainMultivariateModel(
  context: Client,
  modelInfo: MultivariateModelInfo,
  options: MultivariateTrainMultivariateModelOptionalParams = {
    requestOptions: {},
  },
): Promise<MultivariateAnomalyDetectionModel> {
  const result = await _trainMultivariateModelSend(context, modelInfo, options);
  return _trainMultivariateModelDeserialize(result);
}

export function _listMultivariateModelsSend(
  context: Client,
  options: MultivariateListMultivariateModelsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/multivariate/models")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { skip: options?.skip, top: options?.top },
    });
}

export async function _listMultivariateModelsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MultivariateModelList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    models: result.body["models"].map((p: any) => {
      return {
        modelId: p["modelId"],
        createdTime: new Date(p["createdTime"]),
        lastUpdatedTime: new Date(p["lastUpdatedTime"]),
        modelInfo: !p.modelInfo
          ? undefined
          : {
              dataSource: p.modelInfo?.["dataSource"],
              dataSchema: p.modelInfo?.["dataSchema"],
              startTime: new Date(p.modelInfo?.["startTime"]),
              endTime: new Date(p.modelInfo?.["endTime"]),
              displayName: p.modelInfo?.["displayName"],
              slidingWindow: p.modelInfo?.["slidingWindow"],
              alignPolicy: !p.modelInfo?.alignPolicy
                ? undefined
                : {
                    alignMode: p.modelInfo?.alignPolicy?.["alignMode"],
                    fillNAMethod: p.modelInfo?.alignPolicy?.["fillNAMethod"],
                    paddingValue: p.modelInfo?.alignPolicy?.["paddingValue"],
                  },
              status: p.modelInfo?.["status"],
              errors:
                p.modelInfo?.["errors"] === undefined
                  ? p.modelInfo?.["errors"]
                  : p.modelInfo?.["errors"].map((p: any) => {
                      return { code: p["code"], message: p["message"] };
                    }),
              diagnosticsInfo: !p.modelInfo?.diagnosticsInfo
                ? undefined
                : {
                    modelState: !p.modelInfo?.diagnosticsInfo?.modelState
                      ? undefined
                      : {
                          epochIds:
                            p.modelInfo?.diagnosticsInfo?.modelState?.[
                              "epochIds"
                            ],
                          trainLosses:
                            p.modelInfo?.diagnosticsInfo?.modelState?.[
                              "trainLosses"
                            ],
                          validationLosses:
                            p.modelInfo?.diagnosticsInfo?.modelState?.[
                              "validationLosses"
                            ],
                          latenciesInSeconds:
                            p.modelInfo?.diagnosticsInfo?.modelState?.[
                              "latenciesInSeconds"
                            ],
                        },
                    variableStates:
                      p.modelInfo?.diagnosticsInfo?.["variableStates"] ===
                      undefined
                        ? p.modelInfo?.diagnosticsInfo?.["variableStates"]
                        : p.modelInfo?.diagnosticsInfo?.["variableStates"].map(
                            (p: any) => {
                              return {
                                variable: p["variable"],
                                filledNARatio: p["filledNARatio"],
                                effectiveCount: p["effectiveCount"],
                                firstTimestamp:
                                  p["firstTimestamp"] !== undefined
                                    ? new Date(p["firstTimestamp"])
                                    : undefined,
                                lastTimestamp:
                                  p["lastTimestamp"] !== undefined
                                    ? new Date(p["lastTimestamp"])
                                    : undefined,
                              };
                            },
                          ),
                  },
            },
      };
    }),
    currentCount: result.body["currentCount"],
    maxCount: result.body["maxCount"],
    nextLink: result.body["nextLink"],
  };
}

/** List models of a resource. */
export function listMultivariateModels(
  context: Client,
  options: MultivariateListMultivariateModelsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MultivariateAnomalyDetectionModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listMultivariateModelsSend(context, options),
    _listMultivariateModelsDeserialize,
    ["200"],
    { itemName: "models", nextLinkName: "nextLink" },
  );
}

export function _deleteMultivariateModelSend(
  context: Client,
  modelId: string,
  options: MultivariateDeleteMultivariateModelOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/multivariate/models/{modelId}", modelId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteMultivariateModelDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete an existing multivariate model according to the modelId */
export async function deleteMultivariateModel(
  context: Client,
  modelId: string,
  options: MultivariateDeleteMultivariateModelOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteMultivariateModelSend(context, modelId, options);
  return _deleteMultivariateModelDeserialize(result);
}

export function _getMultivariateModelSend(
  context: Client,
  modelId: string,
  options: MultivariateGetMultivariateModelOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/multivariate/models/{modelId}", modelId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getMultivariateModelDeserialize(
  result: PathUncheckedResponse,
): Promise<MultivariateAnomalyDetectionModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    modelId: result.body["modelId"],
    createdTime: new Date(result.body["createdTime"]),
    lastUpdatedTime: new Date(result.body["lastUpdatedTime"]),
    modelInfo: !result.body.modelInfo
      ? undefined
      : {
          dataSource: result.body.modelInfo?.["dataSource"],
          dataSchema: result.body.modelInfo?.["dataSchema"],
          startTime: new Date(result.body.modelInfo?.["startTime"]),
          endTime: new Date(result.body.modelInfo?.["endTime"]),
          displayName: result.body.modelInfo?.["displayName"],
          slidingWindow: result.body.modelInfo?.["slidingWindow"],
          alignPolicy: !result.body.modelInfo?.alignPolicy
            ? undefined
            : {
                alignMode: result.body.modelInfo?.alignPolicy?.["alignMode"],
                fillNAMethod:
                  result.body.modelInfo?.alignPolicy?.["fillNAMethod"],
                paddingValue:
                  result.body.modelInfo?.alignPolicy?.["paddingValue"],
              },
          status: result.body.modelInfo?.["status"],
          errors:
            result.body.modelInfo?.["errors"] === undefined
              ? result.body.modelInfo?.["errors"]
              : result.body.modelInfo?.["errors"].map((p: any) => {
                  return { code: p["code"], message: p["message"] };
                }),
          diagnosticsInfo: !result.body.modelInfo?.diagnosticsInfo
            ? undefined
            : {
                modelState: !result.body.modelInfo?.diagnosticsInfo?.modelState
                  ? undefined
                  : {
                      epochIds:
                        result.body.modelInfo?.diagnosticsInfo?.modelState?.[
                          "epochIds"
                        ],
                      trainLosses:
                        result.body.modelInfo?.diagnosticsInfo?.modelState?.[
                          "trainLosses"
                        ],
                      validationLosses:
                        result.body.modelInfo?.diagnosticsInfo?.modelState?.[
                          "validationLosses"
                        ],
                      latenciesInSeconds:
                        result.body.modelInfo?.diagnosticsInfo?.modelState?.[
                          "latenciesInSeconds"
                        ],
                    },
                variableStates:
                  result.body.modelInfo?.diagnosticsInfo?.["variableStates"] ===
                  undefined
                    ? result.body.modelInfo?.diagnosticsInfo?.["variableStates"]
                    : result.body.modelInfo?.diagnosticsInfo?.[
                        "variableStates"
                      ].map((p: any) => {
                        return {
                          variable: p["variable"],
                          filledNARatio: p["filledNARatio"],
                          effectiveCount: p["effectiveCount"],
                          firstTimestamp:
                            p["firstTimestamp"] !== undefined
                              ? new Date(p["firstTimestamp"])
                              : undefined,
                          lastTimestamp:
                            p["lastTimestamp"] !== undefined
                              ? new Date(p["lastTimestamp"])
                              : undefined,
                        };
                      }),
              },
        },
  };
}

/**
 * Get detailed information of multivariate model, including the training status
 * and variables used in the model.
 */
export async function getMultivariateModel(
  context: Client,
  modelId: string,
  options: MultivariateGetMultivariateModelOptionalParams = {
    requestOptions: {},
  },
): Promise<MultivariateAnomalyDetectionModel> {
  const result = await _getMultivariateModelSend(context, modelId, options);
  return _getMultivariateModelDeserialize(result);
}

export function _detectMultivariateBatchAnomalySend(
  context: Client,
  modelId: string,
  options: MultivariateMultivariateBatchDetectionOptions,
  optionalParams: MultivariateDetectMultivariateBatchAnomalyOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/multivariate/models/{modelId}:detect-batch", modelId)
    .post({
      ...operationOptionsToRequestParameters(optionalParams),
      body: {
        dataSource: options["dataSource"],
        topContributorCount: options["topContributorCount"],
        startTime: options["startTime"].toISOString(),
        endTime: options["endTime"].toISOString(),
      },
    });
}

export async function _detectMultivariateBatchAnomalyDeserialize(
  result: PathUncheckedResponse,
): Promise<MultivariateMultivariateDetectionResult> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    resultId: result.body["resultId"],
    summary: {
      status: result.body.summary["status"],
      errors:
        result.body.summary["errors"] === undefined
          ? result.body.summary["errors"]
          : result.body.summary["errors"].map((p: any) => {
              return { code: p["code"], message: p["message"] };
            }),
      variableStates:
        result.body.summary["variableStates"] === undefined
          ? result.body.summary["variableStates"]
          : result.body.summary["variableStates"].map((p: any) => {
              return {
                variable: p["variable"],
                filledNARatio: p["filledNARatio"],
                effectiveCount: p["effectiveCount"],
                firstTimestamp:
                  p["firstTimestamp"] !== undefined
                    ? new Date(p["firstTimestamp"])
                    : undefined,
                lastTimestamp:
                  p["lastTimestamp"] !== undefined
                    ? new Date(p["lastTimestamp"])
                    : undefined,
              };
            }),
      setupInfo: {
        dataSource: result.body.summary.setupInfo["dataSource"],
        topContributorCount:
          result.body.summary.setupInfo["topContributorCount"],
        startTime: new Date(result.body.summary.setupInfo["startTime"]),
        endTime: new Date(result.body.summary.setupInfo["endTime"]),
      },
    },
    results: result.body["results"].map((p: any) => {
      return {
        timestamp: new Date(p["timestamp"]),
        value: !p.value
          ? undefined
          : {
              isAnomaly: p.value?.["isAnomaly"],
              severity: p.value?.["severity"],
              score: p.value?.["score"],
              interpretation:
                p.value?.["interpretation"] === undefined
                  ? p.value?.["interpretation"]
                  : p.value?.["interpretation"].map((p: any) => {
                      return {
                        variable: p["variable"],
                        contributionScore: p["contributionScore"],
                        correlationChanges: !p.correlationChanges
                          ? undefined
                          : {
                              changedVariables:
                                p.correlationChanges?.["changedVariables"],
                            },
                      };
                    }),
            },
        errors:
          p["errors"] === undefined
            ? p["errors"]
            : p["errors"].map((p: any) => {
                return { code: p["code"], message: p["message"] };
              }),
      };
    }),
  };
}

/**
 * Submit multivariate anomaly detection task with the modelId of trained model
 * and inference data, the input schema should be the same with the training
 * request. The request will complete asynchronously and return a resultId to
 * query the detection result.The request should be a source link to indicate an
 * externally accessible Azure storage Uri, either pointed to an Azure blob
 * storage folder, or pointed to a CSV file in Azure blob storage.
 */
export async function detectMultivariateBatchAnomaly(
  context: Client,
  modelId: string,
  options: MultivariateMultivariateBatchDetectionOptions,
  optionalParams: MultivariateDetectMultivariateBatchAnomalyOptionalParams = {
    requestOptions: {},
  },
): Promise<MultivariateMultivariateDetectionResult> {
  const result = await _detectMultivariateBatchAnomalySend(
    context,
    modelId,
    options,
    optionalParams,
  );
  return _detectMultivariateBatchAnomalyDeserialize(result);
}

export function _detectMultivariateLastAnomalySend(
  context: Client,
  modelId: string,
  options: MultivariateMultivariateLastDetectionOptions,
  optionalParams: MultivariateDetectMultivariateLastAnomalyOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/multivariate/models/{modelId}:detect-last", modelId)
    .post({
      ...operationOptionsToRequestParameters(optionalParams),
      body: {
        variables: options["variables"].map(
          multivariateVariableValuesSerializer,
        ),
        topContributorCount: options["topContributorCount"],
      },
    });
}

export async function _detectMultivariateLastAnomalyDeserialize(
  result: PathUncheckedResponse,
): Promise<MultivariateMultivariateLastDetectionResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    variableStates:
      result.body["variableStates"] === undefined
        ? result.body["variableStates"]
        : result.body["variableStates"].map((p: any) => {
            return {
              variable: p["variable"],
              filledNARatio: p["filledNARatio"],
              effectiveCount: p["effectiveCount"],
              firstTimestamp:
                p["firstTimestamp"] !== undefined
                  ? new Date(p["firstTimestamp"])
                  : undefined,
              lastTimestamp:
                p["lastTimestamp"] !== undefined
                  ? new Date(p["lastTimestamp"])
                  : undefined,
            };
          }),
    results:
      result.body["results"] === undefined
        ? result.body["results"]
        : result.body["results"].map((p: any) => {
            return {
              timestamp: new Date(p["timestamp"]),
              value: !p.value
                ? undefined
                : {
                    isAnomaly: p.value?.["isAnomaly"],
                    severity: p.value?.["severity"],
                    score: p.value?.["score"],
                    interpretation:
                      p.value?.["interpretation"] === undefined
                        ? p.value?.["interpretation"]
                        : p.value?.["interpretation"].map((p: any) => {
                            return {
                              variable: p["variable"],
                              contributionScore: p["contributionScore"],
                              correlationChanges: !p.correlationChanges
                                ? undefined
                                : {
                                    changedVariables:
                                      p.correlationChanges?.[
                                        "changedVariables"
                                      ],
                                  },
                            };
                          }),
                  },
              errors:
                p["errors"] === undefined
                  ? p["errors"]
                  : p["errors"].map((p: any) => {
                      return { code: p["code"], message: p["message"] };
                    }),
            };
          }),
  };
}

/**
 * Submit multivariate anomaly detection task with the modelId of trained model
 * and inference data, and the inference data should be put into request body in a
 * JSON format. The request will complete synchronously and return the detection
 * immediately in the response body.
 */
export async function detectMultivariateLastAnomaly(
  context: Client,
  modelId: string,
  options: MultivariateMultivariateLastDetectionOptions,
  optionalParams: MultivariateDetectMultivariateLastAnomalyOptionalParams = {
    requestOptions: {},
  },
): Promise<MultivariateMultivariateLastDetectionResult> {
  const result = await _detectMultivariateLastAnomalySend(
    context,
    modelId,
    options,
    optionalParams,
  );
  return _detectMultivariateLastAnomalyDeserialize(result);
}
