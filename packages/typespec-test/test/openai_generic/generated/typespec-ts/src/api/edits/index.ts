// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CreateEditRequest, CreateEditResponse } from "../../models/models.js";
import {
  isUnexpected,
  OpenAIContext as Client,
  EditsCreate200Response,
  EditsCreateDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { EditsCreateOptionalParams } from "../../models/options.js";

export function _createSend(
  context: Client,
  edit: CreateEditRequest,
  options: EditsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod<EditsCreate200Response | EditsCreateDefaultResponse> {
  return context
    .path("/edits")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        model: edit["model"],
        input: edit["input"],
        instruction: edit["instruction"],
        n: edit["n"],
        temperature: edit["temperature"],
        top_p: edit["topP"],
      },
    });
}

export async function _createDeserialize(
  result: EditsCreate200Response | EditsCreateDefaultResponse,
): Promise<CreateEditResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    created: new Date(result.body["created"]),
    choices: result.body["choices"].map((p) => {
      return {
        text: p["text"],
        index: p["index"],
        finishReason: p["finish_reason"],
      };
    }),
    usage: {
      promptTokens: result.body.usage["prompt_tokens"],
      completionTokens: result.body.usage["completion_tokens"],
      totalTokens: result.body.usage["total_tokens"],
    },
  };
}

export async function create(
  context: Client,
  edit: CreateEditRequest,
  options: EditsCreateOptionalParams = { requestOptions: {} },
): Promise<CreateEditResponse> {
  const result = await _createSend(context, edit, options);
  return _createDeserialize(result);
}
