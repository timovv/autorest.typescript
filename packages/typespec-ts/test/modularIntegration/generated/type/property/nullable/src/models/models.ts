// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { uint8ArrayToString } from "@azure/core-util";

/** Model with collection string properties */
export interface CollectionsStringProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: string[] | null;
}

export function collectionsStringPropertySerializer(
  item: CollectionsStringProperty,
): Record<string, unknown> {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty: item["nullableProperty"],
  };
}

/** Model with collection models properties */
export interface CollectionsModelProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: InnerModel[] | null;
}

export function collectionsModelPropertySerializer(
  item: CollectionsModelProperty,
): Record<string, unknown> {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty:
      item["nullableProperty"] === null
        ? item["nullableProperty"]
        : item["nullableProperty"].map(innerModelSerializer),
  };
}

/** Inner model used in collections model property */
export interface InnerModel {
  /** Inner model property */
  property: string;
}

export function innerModelSerializer(
  item: InnerModel,
): Record<string, unknown> {
  return {
    property: item["property"],
  };
}

/** Model with collection bytes properties */
export interface CollectionsByteProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: Uint8Array[] | null;
}

export function collectionsBytePropertySerializer(
  item: CollectionsByteProperty,
): Record<string, unknown> {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty:
      item["nullableProperty"] === null
        ? item["nullableProperty"]
        : item["nullableProperty"].map((p) => uint8ArrayToString(p, "base64")),
  };
}

/** Model with a duration property */
export interface DurationProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: string | null;
}

export function durationPropertySerializer(
  item: DurationProperty,
): Record<string, unknown> {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty: item["nullableProperty"],
  };
}

/** Model with a datetime property */
export interface DatetimeProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: Date | null;
}

export function datetimePropertySerializer(
  item: DatetimeProperty,
): Record<string, unknown> {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty:
      item["nullableProperty"] === null
        ? null
        : item["nullableProperty"].toISOString(),
  };
}

/** Template type for testing models with nullable property. Pass in the type of the property you are looking for */
export interface BytesProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: Uint8Array | null;
}

export function bytesPropertySerializer(
  item: BytesProperty,
): Record<string, unknown> {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty:
      item["nullableProperty"] === null
        ? null
        : uint8ArrayToString(item["nullableProperty"], "base64"),
  };
}

/** Template type for testing models with nullable property. Pass in the type of the property you are looking for */
export interface StringProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: string | null;
}

export function stringPropertySerializer(
  item: StringProperty,
): Record<string, unknown> {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty: item["nullableProperty"],
  };
}
