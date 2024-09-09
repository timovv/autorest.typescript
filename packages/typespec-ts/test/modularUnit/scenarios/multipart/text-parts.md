# only: Simple text part

```tsp
model TextPartsUpload {
  firstName: HttpPart<string>;
  lastName: HttpPart<string>;
}

op upload(@header contentType: "multipart/form-data", @multipartBody body: TextPartsUpload): void;
```

The model should be simple:

```ts models
export type FileContent =
  | string
  | Blob
  | Uint8Array
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>;
export type NamedFileContent = File;

export interface TextPartsUpload {
  firstName: string;
  lastName: string;
}

export function textPartsUploadSerializer(
  item: TextPartsUpload,
): Record<string, unknown> {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
  };
}
```

The `send` function should construct a multipart body (array of parts):

```ts operations function _uploadSend
export function _uploadSend(
  context: Client,
  body: TextPartsUpload,
  options: UploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context.path("/").post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "multipart/form-data",
    body: [
      { name: "firstName", body: body.firstName },
      { name: "lastName", body: body.lastName },
    ],
  });
}
```