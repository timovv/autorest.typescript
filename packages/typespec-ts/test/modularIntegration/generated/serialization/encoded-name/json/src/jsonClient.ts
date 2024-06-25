// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Pipeline } from "@azure/core-rest-pipeline";
import { JsonEncodedNameModel } from "./models/models.js";
import { SendOptionalParams, GetOptionalParams } from "./models/options.js";
import {
  createJson,
  JsonClientOptions,
  JsonContext,
  send,
  get,
} from "./api/index.js";

export { JsonClientOptions } from "./api/jsonContext.js";

export class JsonClient {
  private _client: JsonContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Projection */
  constructor(options: JsonClientOptions = {}) {
    this._client = createJson({
      userAgentOptions: {
        userAgentPrefix:
          options?.userAgentOptions?.userAgentPrefix ??
          "azsdk-js-serialization-encoded-name-json-classic/1.0.0-beta.1",
      },
      ...options,
    });
    this.pipeline = this._client.pipeline;
  }

  send(
    body: JsonEncodedNameModel,
    options: SendOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return send(this._client, body, options);
  }

  get(
    options: GetOptionalParams = { requestOptions: {} },
  ): Promise<JsonEncodedNameModel> {
    return get(this._client, options);
  }
}
