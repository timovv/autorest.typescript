/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "ms-rest-js";
import * as Mappers from "../models/formdataMappers";
import { AutoRestSwaggerBATFormDataServiceContext } from "../autoRestSwaggerBATFormDataServiceContext";

const WebResource = msRest.WebResource;

/** Class representing a Formdata. */
export class Formdata {
  private readonly client: AutoRestSwaggerBATFormDataServiceContext;
  private readonly serializer = new msRest.Serializer(Mappers);
  /**
   * Create a Formdata.
   * @param {AutoRestSwaggerBATFormDataServiceContext} client Reference to the service client.
   */
  constructor(client: AutoRestSwaggerBATFormDataServiceContext) {
    this.client = client;
  }

  /**
   * Upload file
   *
   * @param {msRest.HttpRequestBody} fileContent File to upload.
   *
   * @param {string} fileName File name to upload. Name has to be spelled exactly
   * as written here.
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} - The deserialized result object.
   *
   * @reject {Error|ServiceError} - The error object.
   */
  async uploadFileWithHttpOperationResponse(fileContent: msRest.HttpRequestBody, fileName: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>> {
    let client = this.client;

    // Create HTTP transport objects
    const httpRequest = new WebResource();
    httpRequest.rawResponse = true;
    let operationRes: msRest.HttpOperationResponse;
    try {
      const operationArguments: msRest.OperationArguments = msRest.createOperationArguments(
        {
          fileContent,
          fileName
        },
        options);
      operationRes = await client.sendOperationRequest(
        httpRequest,
        operationArguments,
        {
          httpMethod: "POST",
          baseUrl: this.client.baseUri,
          path: "formdata/stream/uploadfile",
          formDataParameters: [
            {
              parameterPath: "fileContent",
              mapper: {
                required: true,
                serializedName: "fileContent",
                type: {
                  name: "Stream"
                }
              }
            },
            {
              parameterPath: "fileName",
              mapper: {
                required: true,
                serializedName: "fileName",
                type: {
                  name: "String"
                }
              }
            }
          ],
          contentType: "multipart/form-data",
          serializer: this.serializer
        });
      let statusCode = operationRes.status;
      if (statusCode !== 200) {
        let error = new msRest.RestError(`Unexpected status code: ${statusCode}`);
        error.statusCode = operationRes.status;
        error.request = msRest.stripRequest(httpRequest);
        error.response = msRest.stripResponse(operationRes);
        let parsedErrorResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedErrorResponse) {
            let internalError = null;
            if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
            error.code = internalError ? internalError.code : parsedErrorResponse.code;
            error.message = internalError ? internalError.message : parsedErrorResponse.message;
          }
          if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
            const resultMapper = Mappers.ErrorModel;
            error.body = this.serializer.deserialize(resultMapper, parsedErrorResponse, 'error.body');
          }
        } catch (defaultError) {
          error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                           `- "${operationRes.bodyAsText}" for the default response.`;
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Upload file
   *
   * @param {msRest.HttpRequestBody} fileContent File to upload.
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} - The deserialized result object.
   *
   * @reject {Error|ServiceError} - The error object.
   */
  async uploadFileViaBodyWithHttpOperationResponse(fileContent: msRest.HttpRequestBody, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>> {
    let client = this.client;

    // Create HTTP transport objects
    const httpRequest = new WebResource();
    httpRequest.rawResponse = true;
    let operationRes: msRest.HttpOperationResponse;
    try {
      const operationArguments: msRest.OperationArguments = msRest.createOperationArguments(
        {
          fileContent
        },
        options);
      operationRes = await client.sendOperationRequest(
        httpRequest,
        operationArguments,
        {
          httpMethod: "PUT",
          baseUrl: this.client.baseUri,
          path: "formdata/stream/uploadfile",
          requestBody: {
            parameterPath: "fileContent",
            mapper: {
              required: true,
              serializedName: "fileContent",
              type: {
                name: "Stream"
              }
            }
          },
          contentType: "application/octet-stream",
          serializer: this.serializer
        });
      let statusCode = operationRes.status;
      if (statusCode !== 200) {
        let error = new msRest.RestError(`Unexpected status code: ${statusCode}`);
        error.statusCode = operationRes.status;
        error.request = msRest.stripRequest(httpRequest);
        error.response = msRest.stripResponse(operationRes);
        let parsedErrorResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedErrorResponse) {
            let internalError = null;
            if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
            error.code = internalError ? internalError.code : parsedErrorResponse.code;
            error.message = internalError ? internalError.message : parsedErrorResponse.message;
          }
          if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
            const resultMapper = Mappers.ErrorModel;
            error.body = this.serializer.deserialize(resultMapper, parsedErrorResponse, 'error.body');
          }
        } catch (defaultError) {
          error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                           `- "${operationRes.bodyAsText}" for the default response.`;
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

}
