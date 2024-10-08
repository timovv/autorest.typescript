// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Schema Group resource. */
export interface SchemaGroup {
  /** Name of schema group. */
  readonly groupName: string;
}

/** Type of SchemaContentTypeValues */
export type SchemaContentTypeValues =
  | "application/json; serialization=Avro"
  | "application/json; serialization=json"
  | "text/plain; charset=utf-8"
  | "text/vnd.ms.protobuf";

/** Schema versions resource. */
export interface SchemaVersion {
  /** Version number of specific schema. */
  readonly schemaVersion: number;
}

/** Represents the Schema Registry API version to use for requests. */
export type ServiceApiVersions = "2021-10" | "2022-10" | "2023-07-01";

/** Meta properties of a schema. */
export interface SchemaProperties {
  /** References a specific schema in the registry namespace. */
  id: string;
  /** Format for the schema being stored. */
  format: SchemaFormat;
  /** Schema group under which schema is stored. */
  groupName: string;
  /** Name of schema. */
  name: string;
  /** Version of schema. */
  version: number;
}

export function schemaPropertiesSerializer(
  item: SchemaProperties,
): Record<string, unknown> {
  return {
    id: item["id"],
    format: item["format"],
    groupName: item["groupName"],
    name: item["name"],
    version: item["version"],
  };
}

/** Represents the format of the schema to be stored by the Schema Registry service. */
export type SchemaFormat = "Avro" | "Json" | "Custom" | "Protobuf";

/** The schema content of a schema, along with id and meta properties. */
export interface Schema {
  /** The content of the schema. */
  definition: string;
  /** The properties of the schema. */
  properties: SchemaProperties;
}

export function schemaSerializer(item: Schema): Record<string, unknown> {
  return {
    definition: item["definition"],
    properties: schemaPropertiesSerializer(item.properties),
  };
}

/** The content type for the schema. */
export type ContentTypeEnum =
  | "application/octet-stream"
  | "application/json; serialization=Avro"
  | "application/json; serialization=json"
  | "text/vnd.ms.protobuf";

/** Paged collection of SchemaGroup items */
export interface _PagedSchemaGroup {
  /** The SchemaGroup items on this page */
  value: SchemaGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Paged collection of Version items */
export interface _PagedVersion {
  /** The Version items on this page */
  value: SchemaVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}
