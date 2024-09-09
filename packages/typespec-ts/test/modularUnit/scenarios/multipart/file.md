# only: File upload

```tsp

model MultipartFileUpload {
  file: HttpPart<File>;
}

op upload(@header contentType: "multipart/form-data", @multipartBody body: MultipartFileUpload): void;
```

```ts models
export type FileContent =
  | string
  | Blob
  | Uint8Array
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>;
export type NamedFileContent = File;

export interface MultipartFileUpload {
  file: FileContent | FileDetails;
}

export function multipartFileUploadSerializer(
  item: MultipartFileUpload,
): Record<string, unknown> {
  return {
    file: fileDetailsSerializer(item.file),
  };
}

export interface FileDetails {
  contentType?: string;
  filename?: string;
  contents: FileContent;
}

export function fileDetailsSerializer(
  item: FileDetails,
): Record<string, unknown> {
  return {
    contentType: item["contentType"],
    filename: item["filename"],
    body: item["contents"],
  };
}
```

```ts operations
import { TestingContext as Client } from "./index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";

export function _uploadSend(
  context: Client,
  body: MultipartFileUpload,
  options: UploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: [_PLACEHOLDER_o13_("file", body.file)],
    });
}

export async function _uploadDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

export async function upload(
  context: Client,
  body: MultipartFileUpload,
  options: UploadOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _uploadSend(context, body, options);
  return _uploadDeserialize(result);
}
```