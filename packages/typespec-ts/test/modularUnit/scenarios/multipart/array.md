# only: Array of parts

```tsp
model ArrayOfPartsUpload {
  names: HttpPart<utcDateTime>[];
}

op upload(@header contentType: "multipart/form-data", @multipartBody body: ArrayOfPartsUpload): void;
```

`names` property is an array of strings:

```ts models interface ArrayOfPartsUpload
export interface ArrayOfPartsUpload {
  names: Date[];
}
```

The `send` function should map each name string into a part:

```ts operations function _uploadSend
export function _uploadSend(
  context: Client,
  body: ArrayOfPartsUpload,
  options: UploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: [
        ...body.names.map((x) => ({ name: "names", body: x.toISOString() })),
      ],
    });
}
```

# only: Array, single part, JSON

```tsp
model SinglePartArrayUpload {
  names: HttpPart<string[]>;
}

op upload(@header contentType: "multipart/form-data", @multipartBody body: SinglePartArrayUpload): void;
```

`names` property is an array of strings:

```ts models interface SinglePartArrayUpload
export interface SinglePartArrayUpload {
  names: string[];
}
```

The `send` function should map each name string into a part:

```ts operations function _uploadSend
export function _uploadSend(
  context: Client,
  body: SinglePartArrayUpload,
  options: UploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: [{ name: "names", body: body.names }],
    });
}
```