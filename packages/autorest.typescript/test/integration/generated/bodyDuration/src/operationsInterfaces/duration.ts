/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  DurationGetNullOptionalParams,
  DurationGetNullResponse,
  DurationPutPositiveDurationOptionalParams,
  DurationGetPositiveDurationOptionalParams,
  DurationGetPositiveDurationResponse,
  DurationGetInvalidOptionalParams,
  DurationGetInvalidResponse,
} from "../models";

/** Interface representing a Duration. */
export interface Duration {
  /**
   * Get null duration value
   * @param options The options parameters.
   */
  getNull(
    options?: DurationGetNullOptionalParams,
  ): Promise<DurationGetNullResponse>;
  /**
   * Put a positive duration value
   * @param durationBody duration body
   * @param options The options parameters.
   */
  putPositiveDuration(
    durationBody: string,
    options?: DurationPutPositiveDurationOptionalParams,
  ): Promise<void>;
  /**
   * Get a positive duration value
   * @param options The options parameters.
   */
  getPositiveDuration(
    options?: DurationGetPositiveDurationOptionalParams,
  ): Promise<DurationGetPositiveDurationResponse>;
  /**
   * Get an invalid duration value
   * @param options The options parameters.
   */
  getInvalid(
    options?: DurationGetInvalidOptionalParams,
  ): Promise<DurationGetInvalidResponse>;
}
