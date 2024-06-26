// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpreadModelArrayRecord } from "../../models/models.js";
import {
  AdditionalPropertiesContext as Client,
  SpreadModelArrayGet200Response,
  SpreadModelArrayPut204Response,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import {
  SpreadModelArrayGetOptionalParams,
  SpreadModelArrayPutOptionalParams,
} from "../../models/options.js";

export function _getSend(
  context: Client,
  options: SpreadModelArrayGetOptionalParams = { requestOptions: {} },
): StreamableMethod<SpreadModelArrayGet200Response> {
  return context
    .path("/type/property/additionalProperties/spreadRecordModelArray")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(
  result: SpreadModelArrayGet200Response,
): Promise<SpreadModelArrayRecord> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return result.body as any;
}

/** Get call */
export async function get(
  context: Client,
  options: SpreadModelArrayGetOptionalParams = { requestOptions: {} },
): Promise<SpreadModelArrayRecord> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}

export function _putSend(
  context: Client,
  body: SpreadModelArrayRecord,
  options: SpreadModelArrayPutOptionalParams = { requestOptions: {} },
): StreamableMethod<SpreadModelArrayPut204Response> {
  return context
    .path("/type/property/additionalProperties/spreadRecordModelArray")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: serializeRecord(body as any) as any,
    });
}

export async function _putDeserialize(
  result: SpreadModelArrayPut204Response,
): Promise<void> {
  if (result.status !== "204") {
    throw createRestError(result);
  }

  return;
}

/** Put operation */
export async function put(
  context: Client,
  body: SpreadModelArrayRecord,
  options: SpreadModelArrayPutOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _putSend(context, body, options);
  return _putDeserialize(result);
}
