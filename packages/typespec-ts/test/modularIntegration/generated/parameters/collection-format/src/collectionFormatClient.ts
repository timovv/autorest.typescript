// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Pipeline } from "@azure/core-rest-pipeline";
import { getQueryOperations, QueryOperations } from "./classic/query/index.js";
import {
  getHeaderOperations,
  HeaderOperations,
} from "./classic/header/index.js";
import {
  createCollectionFormat,
  CollectionFormatClientOptions,
  CollectionFormatContext,
} from "./api/index.js";

export { CollectionFormatClientOptions } from "./api/collectionFormatContext.js";

export class CollectionFormatClient {
  private _client: CollectionFormatContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Test for collectionFormat. */
  constructor(options: CollectionFormatClientOptions = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-modular-classic`
      : "azsdk-js-modular-classic";

    this._client = createCollectionFormat({
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.query = getQueryOperations(this._client);
    this.header = getHeaderOperations(this._client);
  }

  /** The operation groups for Query */
  public readonly query: QueryOperations;
  /** The operation groups for Header */
  public readonly header: HeaderOperations;
}
