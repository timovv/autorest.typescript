// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DatetimeProperty } from "../../models/models.js";
import { OptionalContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  DatetimeGetAllOptionalParams,
  DatetimeGetDefaultOptionalParams,
  DatetimePutAllOptionalParams,
  DatetimePutDefaultOptionalParams,
} from "../../models/options.js";

export function _getAllSend(
  context: Client,
  options: DatetimeGetAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/type/property/optional/datetime/all")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getAllDeserialize(
  result: PathUncheckedResponse,
): Promise<DatetimeProperty> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    property:
      result.body["property"] !== undefined
        ? new Date(result.body["property"])
        : undefined,
  };
}

/** Get models that will return all properties in the model */
export async function getAll(
  context: Client,
  options: DatetimeGetAllOptionalParams = { requestOptions: {} },
): Promise<DatetimeProperty> {
  const result = await _getAllSend(context, options);
  return _getAllDeserialize(result);
}

export function _getDefaultSend(
  context: Client,
  options: DatetimeGetDefaultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/type/property/optional/datetime/default")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDefaultDeserialize(
  result: PathUncheckedResponse,
): Promise<DatetimeProperty> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    property:
      result.body["property"] !== undefined
        ? new Date(result.body["property"])
        : undefined,
  };
}

/** Get models that will return the default object */
export async function getDefault(
  context: Client,
  options: DatetimeGetDefaultOptionalParams = { requestOptions: {} },
): Promise<DatetimeProperty> {
  const result = await _getDefaultSend(context, options);
  return _getDefaultDeserialize(result);
}

export function _putAllSend(
  context: Client,
  body: DatetimeProperty,
  options: DatetimePutAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/type/property/optional/datetime/all")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: { property: body["property"]?.toISOString() },
    });
}

export async function _putAllDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Put a body with all properties present. */
export async function putAll(
  context: Client,
  body: DatetimeProperty,
  options: DatetimePutAllOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _putAllSend(context, body, options);
  return _putAllDeserialize(result);
}

export function _putDefaultSend(
  context: Client,
  body: DatetimeProperty,
  options: DatetimePutDefaultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/type/property/optional/datetime/default")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: { property: body["property"]?.toISOString() },
    });
}

export async function _putDefaultDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Put a body with default properties. */
export async function putDefault(
  context: Client,
  body: DatetimeProperty,
  options: DatetimePutDefaultOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _putDefaultSend(context, body, options);
  return _putDefaultDeserialize(result);
}
