/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  QueriesGetBooleanTrueOptionalParams,
  QueriesGetBooleanFalseOptionalParams,
  QueriesGetBooleanNullOptionalParams,
  QueriesGetIntOneMillionOptionalParams,
  QueriesGetIntNegativeOneMillionOptionalParams,
  QueriesGetIntNullOptionalParams,
  QueriesGetTenBillionOptionalParams,
  QueriesGetNegativeTenBillionOptionalParams,
  QueriesGetLongNullOptionalParams,
  QueriesFloatScientificPositiveOptionalParams,
  QueriesFloatScientificNegativeOptionalParams,
  QueriesFloatNullOptionalParams,
  QueriesDoubleDecimalPositiveOptionalParams,
  QueriesDoubleDecimalNegativeOptionalParams,
  QueriesDoubleNullOptionalParams,
  QueriesStringUnicodeOptionalParams,
  QueriesStringUrlEncodedOptionalParams,
  QueriesStringEmptyOptionalParams,
  QueriesStringNullOptionalParams,
  QueriesEnumValidOptionalParams,
  QueriesEnumNullOptionalParams,
  QueriesByteMultiByteOptionalParams,
  QueriesByteEmptyOptionalParams,
  QueriesByteNullOptionalParams,
  QueriesDateValidOptionalParams,
  QueriesDateNullOptionalParams,
  QueriesDateTimeValidOptionalParams,
  QueriesDateTimeNullOptionalParams,
  QueriesArrayStringCsvValidOptionalParams,
  QueriesArrayStringCsvNullOptionalParams,
  QueriesArrayStringCsvEmptyOptionalParams,
  QueriesArrayStringNoCollectionFormatEmptyOptionalParams,
  QueriesArrayStringSsvValidOptionalParams,
  QueriesArrayStringTsvValidOptionalParams,
  QueriesArrayStringPipesValidOptionalParams,
} from "../models";

/** Interface representing a Queries. */
export interface Queries {
  /**
   * Get true Boolean value on path
   * @param options The options parameters.
   */
  getBooleanTrue(options?: QueriesGetBooleanTrueOptionalParams): Promise<void>;
  /**
   * Get false Boolean value on path
   * @param options The options parameters.
   */
  getBooleanFalse(
    options?: QueriesGetBooleanFalseOptionalParams,
  ): Promise<void>;
  /**
   * Get null Boolean value on query (query string should be absent)
   * @param options The options parameters.
   */
  getBooleanNull(options?: QueriesGetBooleanNullOptionalParams): Promise<void>;
  /**
   * Get '1000000' integer value
   * @param options The options parameters.
   */
  getIntOneMillion(
    options?: QueriesGetIntOneMillionOptionalParams,
  ): Promise<void>;
  /**
   * Get '-1000000' integer value
   * @param options The options parameters.
   */
  getIntNegativeOneMillion(
    options?: QueriesGetIntNegativeOneMillionOptionalParams,
  ): Promise<void>;
  /**
   * Get null integer value (no query parameter)
   * @param options The options parameters.
   */
  getIntNull(options?: QueriesGetIntNullOptionalParams): Promise<void>;
  /**
   * Get '10000000000' 64 bit integer value
   * @param options The options parameters.
   */
  getTenBillion(options?: QueriesGetTenBillionOptionalParams): Promise<void>;
  /**
   * Get '-10000000000' 64 bit integer value
   * @param options The options parameters.
   */
  getNegativeTenBillion(
    options?: QueriesGetNegativeTenBillionOptionalParams,
  ): Promise<void>;
  /**
   * Get 'null 64 bit integer value (no query param in uri)
   * @param options The options parameters.
   */
  getLongNull(options?: QueriesGetLongNullOptionalParams): Promise<void>;
  /**
   * Get '1.034E+20' numeric value
   * @param options The options parameters.
   */
  floatScientificPositive(
    options?: QueriesFloatScientificPositiveOptionalParams,
  ): Promise<void>;
  /**
   * Get '-1.034E-20' numeric value
   * @param options The options parameters.
   */
  floatScientificNegative(
    options?: QueriesFloatScientificNegativeOptionalParams,
  ): Promise<void>;
  /**
   * Get null numeric value (no query parameter)
   * @param options The options parameters.
   */
  floatNull(options?: QueriesFloatNullOptionalParams): Promise<void>;
  /**
   * Get '9999999.999' numeric value
   * @param options The options parameters.
   */
  doubleDecimalPositive(
    options?: QueriesDoubleDecimalPositiveOptionalParams,
  ): Promise<void>;
  /**
   * Get '-9999999.999' numeric value
   * @param options The options parameters.
   */
  doubleDecimalNegative(
    options?: QueriesDoubleDecimalNegativeOptionalParams,
  ): Promise<void>;
  /**
   * Get null numeric value (no query parameter)
   * @param options The options parameters.
   */
  doubleNull(options?: QueriesDoubleNullOptionalParams): Promise<void>;
  /**
   * Get '啊齄丂狛狜隣郎隣兀﨩' multi-byte string value
   * @param options The options parameters.
   */
  stringUnicode(options?: QueriesStringUnicodeOptionalParams): Promise<void>;
  /**
   * Get 'begin!*'();:@ &=+$,/?#[]end
   * @param options The options parameters.
   */
  stringUrlEncoded(
    options?: QueriesStringUrlEncodedOptionalParams,
  ): Promise<void>;
  /**
   * Get ''
   * @param options The options parameters.
   */
  stringEmpty(options?: QueriesStringEmptyOptionalParams): Promise<void>;
  /**
   * Get null (no query parameter in url)
   * @param options The options parameters.
   */
  stringNull(options?: QueriesStringNullOptionalParams): Promise<void>;
  /**
   * Get using uri with query parameter 'green color'
   * @param options The options parameters.
   */
  enumValid(options?: QueriesEnumValidOptionalParams): Promise<void>;
  /**
   * Get null (no query parameter in url)
   * @param options The options parameters.
   */
  enumNull(options?: QueriesEnumNullOptionalParams): Promise<void>;
  /**
   * Get '啊齄丂狛狜隣郎隣兀﨩' multibyte value as utf-8 encoded byte array
   * @param options The options parameters.
   */
  byteMultiByte(options?: QueriesByteMultiByteOptionalParams): Promise<void>;
  /**
   * Get '' as byte array
   * @param options The options parameters.
   */
  byteEmpty(options?: QueriesByteEmptyOptionalParams): Promise<void>;
  /**
   * Get null as byte array (no query parameters in uri)
   * @param options The options parameters.
   */
  byteNull(options?: QueriesByteNullOptionalParams): Promise<void>;
  /**
   * Get '2012-01-01' as date
   * @param options The options parameters.
   */
  dateValid(options?: QueriesDateValidOptionalParams): Promise<void>;
  /**
   * Get null as date - this should result in no query parameters in uri
   * @param options The options parameters.
   */
  dateNull(options?: QueriesDateNullOptionalParams): Promise<void>;
  /**
   * Get '2012-01-01T01:01:01Z' as date-time
   * @param options The options parameters.
   */
  dateTimeValid(options?: QueriesDateTimeValidOptionalParams): Promise<void>;
  /**
   * Get null as date-time, should result in no query parameters in uri
   * @param options The options parameters.
   */
  dateTimeNull(options?: QueriesDateTimeNullOptionalParams): Promise<void>;
  /**
   * Get an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the csv-array
   * format
   * @param options The options parameters.
   */
  arrayStringCsvValid(
    options?: QueriesArrayStringCsvValidOptionalParams,
  ): Promise<void>;
  /**
   * Get a null array of string using the csv-array format
   * @param options The options parameters.
   */
  arrayStringCsvNull(
    options?: QueriesArrayStringCsvNullOptionalParams,
  ): Promise<void>;
  /**
   * Get an empty array [] of string using the csv-array format
   * @param options The options parameters.
   */
  arrayStringCsvEmpty(
    options?: QueriesArrayStringCsvEmptyOptionalParams,
  ): Promise<void>;
  /**
   * Array query has no defined collection format, should default to csv. Pass in ['hello', 'nihao',
   * 'bonjour'] for the 'arrayQuery' parameter to the service
   * @param options The options parameters.
   */
  arrayStringNoCollectionFormatEmpty(
    options?: QueriesArrayStringNoCollectionFormatEmptyOptionalParams,
  ): Promise<void>;
  /**
   * Get an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the ssv-array
   * format
   * @param options The options parameters.
   */
  arrayStringSsvValid(
    options?: QueriesArrayStringSsvValidOptionalParams,
  ): Promise<void>;
  /**
   * Get an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the tsv-array
   * format
   * @param options The options parameters.
   */
  arrayStringTsvValid(
    options?: QueriesArrayStringTsvValidOptionalParams,
  ): Promise<void>;
  /**
   * Get an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the
   * pipes-array format
   * @param options The options parameters.
   */
  arrayStringPipesValid(
    options?: QueriesArrayStringPipesValidOptionalParams,
  ): Promise<void>;
}
