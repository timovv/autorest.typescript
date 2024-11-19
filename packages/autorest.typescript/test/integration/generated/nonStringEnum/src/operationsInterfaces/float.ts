/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  FloatPutOptionalParams,
  FloatPutResponse,
  FloatGetOptionalParams,
  FloatGetResponse,
} from "../models";

/** Interface representing a Float. */
export interface Float {
  /**
   * Put a float enum
   * @param options The options parameters.
   */
  put(options?: FloatPutOptionalParams): Promise<FloatPutResponse>;
  /**
   * Get a float enum
   * @param options The options parameters.
   */
  get(options?: FloatGetOptionalParams): Promise<FloatGetResponse>;
}
