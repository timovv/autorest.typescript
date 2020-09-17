/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const ErrorModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorModel",
    modelProperties: {
      status: {
        serializedName: "status",
        type: {
          name: "Number"
        }
      },
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Paths1MqqetpFormdataStreamUploadfilePostRequestbodyContentMultipartFormDataSchema: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className:
      "Paths1MqqetpFormdataStreamUploadfilePostRequestbodyContentMultipartFormDataSchema",
    modelProperties: {
      fileContent: {
        serializedName: "fileContent",
        required: true,
        type: {
          name: "Stream"
        }
      },
      fileName: {
        serializedName: "fileName",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};
