// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type { Widget } from "./models.js";

export type GetWidgetParameters = RequestParameters;
export type GetWidgetOperationStatusParameters = RequestParameters;
/** The resource instance. */
export type WidgetResourceMergeAndPatch = Partial<Widget>;

export interface CreateOrUpdateWidgetBodyParam {
  /** The resource instance. */
  body: WidgetResourceMergeAndPatch;
}

export interface CreateOrUpdateWidgetMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateWidgetParameters =
  CreateOrUpdateWidgetMediaTypesParam &
    CreateOrUpdateWidgetBodyParam &
    RequestParameters;
export type DeleteWidgetParameters = RequestParameters;
export type ListWidgetsParameters = RequestParameters;
