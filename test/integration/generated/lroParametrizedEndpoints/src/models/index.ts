/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";

export interface ErrorModel {
  status?: number;
  message?: string;
}

/** Defines headers for LroParametrizedEndpointsClient_pollWithParameterizedEndpoints operation. */
export interface LroParametrizedEndpointsClientPollWithParameterizedEndpointsHeaders {
  /** Url to retrieve the final update resource. Is a relative link */
  location?: string;
}

/** Defines headers for LroParametrizedEndpointsClient_pollWithConstantParameterizedEndpoints operation. */
export interface LroParametrizedEndpointsClientPollWithConstantParameterizedEndpointsHeaders {
  /** Url to retrieve the final update resource. Is a relative link */
  location?: string;
}

/** Optional parameters. */
export interface PollWithParameterizedEndpointsOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the pollWithParameterizedEndpoints operation. */
export type PollWithParameterizedEndpointsResponse = {
  /** The parsed response body. */
  body: string;
};

/** Optional parameters. */
export interface PollWithConstantParameterizedEndpointsOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the pollWithConstantParameterizedEndpoints operation. */
export type PollWithConstantParameterizedEndpointsResponse = {
  /** The parsed response body. */
  body: string;
};

/** Optional parameters. */
export interface LroParametrizedEndpointsClientOptionalParams
  extends coreClient.ServiceClientOptions {
  /** A string value that is used as a global part of the parameterized host. Pass in 'host:3000' to pass test. */
  host?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
