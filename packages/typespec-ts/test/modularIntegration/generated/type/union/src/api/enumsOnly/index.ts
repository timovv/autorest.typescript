// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnumsOnlyCases } from "../../models/models.js";
import {
  UnionContext as Client,
  EnumsOnlyGet200Response,
  EnumsOnlySend204Response,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  EnumsOnlyGetOptionalParams,
  EnumsOnlySendOptionalParams,
} from "../../models/options.js";

export function _enumsOnlyGetSend(
  context: Client,
  options: EnumsOnlyGetOptionalParams = { requestOptions: {} },
): StreamableMethod<EnumsOnlyGet200Response> {
  return context
    .path("/type/union/enums-only")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _enumsOnlyGetDeserialize(
  result: EnumsOnlyGet200Response,
): Promise<{ prop: EnumsOnlyCases }> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    prop: { lr: result.body.prop["lr"], ud: result.body.prop["ud"] },
  };
}

export async function enumsOnlyGet(
  context: Client,
  options: EnumsOnlyGetOptionalParams = { requestOptions: {} },
): Promise<{ prop: EnumsOnlyCases }> {
  const result = await _enumsOnlyGetSend(context, options);
  return _enumsOnlyGetDeserialize(result);
}

export function _enumsOnlySendSend(
  context: Client,
  prop: EnumsOnlyCases,
  options: EnumsOnlySendOptionalParams = { requestOptions: {} },
): StreamableMethod<EnumsOnlySend204Response> {
  return context
    .path("/type/union/enums-only")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { prop: { lr: prop["lr"], ud: prop["ud"] } },
    });
}

export async function _enumsOnlySendDeserialize(
  result: EnumsOnlySend204Response,
): Promise<void> {
  if (result.status !== "204") {
    throw createRestError(result);
  }

  return;
}

export async function enumsOnlySend(
  context: Client,
  prop: EnumsOnlyCases,
  options: EnumsOnlySendOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enumsOnlySendSend(context, prop, options);
  return _enumsOnlySendDeserialize(result);
}
