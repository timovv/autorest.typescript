# only: JSON parts

```tsp

model Person {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  birthday: utcDateTime;
}

model JsonPartsUpload {
  person: HttpPart<Person>;
}

op upload(@header contentType: "multipart/form-data", @multipartBody body: JsonPartsUpload): void;
```

```ts models
export type FileContent =
  | string
  | Blob
  | Uint8Array
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>;
export type NamedFileContent = File;

export interface JsonPartsUpload {
  person: Person;
}

export function jsonPartsUploadSerializer(
  item: JsonPartsUpload,
): Record<string, unknown> {
  return {
    person: personSerializer(item.person),
  };
}

export interface Person {
  id: string;
  name: { firstName: string; lastName: string };
  birthday: Date;
}

export function personSerializer(item: Person): Record<string, unknown> {
  return {
    id: item["id"],
    name: {
      firstName: item.name["firstName"],
      lastName: item.name["lastName"],
    },
    birthday: item["birthday"].toISOString(),
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
  body: JsonPartsUpload,
  options: UploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: [{ name: "person", body: body.person }],
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
  body: JsonPartsUpload,
  options: UploadOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _uploadSend(context, body, options);
  return _uploadDeserialize(result);
}
```