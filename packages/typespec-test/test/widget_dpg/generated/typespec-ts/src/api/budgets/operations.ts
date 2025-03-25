// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SAPWidgetServiceContext as Client } from "../index.js";
import {
  SAPUser,
  sapUserSerializer,
  sapUserDeserializer,
  Widget,
  widgetErrorDeserializer,
  widgetArrayDeserializer,
} from "../../models/models.js";
import {
  BudgetsGetBudgetsOptionalParams,
  BudgetsCreateOrReplaceOptionalParams,
} from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getBudgetsSend(
  context: Client,
  name: string,
  options: BudgetsGetBudgetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/budgets{?name}",
    {
      name: name,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getBudgetsDeserialize(
  result: PathUncheckedResponse,
): Promise<Widget[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = widgetErrorDeserializer(result.body);
    throw error;
  }

  return widgetArrayDeserializer(result.body);
}

export async function getBudgets(
  context: Client,
  name: string,
  options: BudgetsGetBudgetsOptionalParams = { requestOptions: {} },
): Promise<Widget[]> {
  const result = await _getBudgetsSend(context, name, options);
  return _getBudgetsDeserialize(result);
}

export function _createOrReplaceSend(
  context: Client,
  name: string,
  resource: SAPUser,
  options: BudgetsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/budgets/widgets/createOrReplace/users/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: sapUserSerializer(resource),
    });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPUser> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sapUserDeserializer(result.body);
}

/** Long-running resource create or replace operation template. */
export function createOrReplace(
  context: Client,
  name: string,
  resource: SAPUser,
  options: BudgetsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SAPUser>, SAPUser> {
  return getLongRunningPoller(
    context,
    _createOrReplaceDeserialize,
    ["201", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrReplaceSend(context, name, resource, options),
      resourceLocationConfig: "original-uri",
    },
  ) as PollerLike<OperationState<SAPUser>, SAPUser>;
}
