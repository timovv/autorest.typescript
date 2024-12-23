// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { LoadTestAdministrationClient } from "./loadTestAdministration/loadTestAdministrationClient.js";
export {
  Test,
  PassFailCriteria,
  PassFailMetric,
  KnownPFMetrics,
  PFMetrics,
  KnownPFAgFunc,
  PFAgFunc,
  KnownPFAction,
  PFAction,
  KnownPFResult,
  PFResult,
  AutoStopCriteria,
  Secret,
  KnownSecretType,
  SecretType,
  CertificateMetadata,
  KnownCertificateType,
  CertificateType,
  LoadTestConfiguration,
  OptionalLoadTestConfig,
  RegionalConfiguration,
  TestInputArtifacts,
  TestFileInfo,
  KnownFileType,
  FileType,
  KnownFileStatus,
  FileStatus,
  KnownTestKind,
  TestKind,
  TestAppComponents,
  AppComponent,
  TestServerMetricConfig,
  ResourceMetric,
  TestRun,
  ErrorDetails,
  TestRunStatistics,
  TestRunArtifacts,
  TestRunInputArtifacts,
  TestRunFileInfo,
  TestRunOutputArtifacts,
  ArtifactsContainerInfo,
  KnownPFTestResult,
  PFTestResult,
  KnownStatus,
  Status,
  KnownRequestDataLevel,
  RequestDataLevel,
  TestRunAppComponents,
  TestRunServerMetricConfig,
  DimensionValueList,
  MetricDefinitionCollection,
  MetricDefinition,
  NameAndDesc,
  KnownAggregationType,
  AggregationType,
  KnownMetricUnit,
  MetricUnit,
  MetricAvailability,
  KnownTimeGrain,
  TimeGrain,
  MetricNamespaceCollection,
  MetricNamespace,
  MetricRequestPayload,
  DimensionFilter,
  TimeSeriesElement,
  MetricValue,
  DimensionValue,
  TestProfile,
  TargetResourceConfigurations,
  TargetResourceConfigurationsUnion,
  KnownResourceKind,
  ResourceKind,
  FunctionFlexConsumptionTargetResourceConfigurations,
  FunctionFlexConsumptionResourceConfiguration,
  TestProfileRun,
  KnownTestProfileRunStatus,
  TestProfileRunStatus,
  TestRunDetail,
  TestProfileRunRecommendation,
  KnownRecommendationCategory,
  RecommendationCategory,
  KnownAPIVersions,
} from "./models/index.js";
export {
  LoadTestAdministrationClientOptionalParams,
  CreateOrUpdateTestOptionalParams,
  CreateOrUpdateAppComponentsOptionalParams,
  CreateOrUpdateServerMetricsConfigOptionalParams,
  GetAppComponentsOptionalParams,
  GetServerMetricsConfigOptionalParams,
  GetTestOptionalParams,
  GetTestFileOptionalParams,
  ListTestFilesOptionalParams,
  ListTestsOptionalParams,
  UploadTestFileOptionalParams,
  DeleteTestFileOptionalParams,
  DeleteTestOptionalParams,
} from "./loadTestAdministration/api/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { LoadTestRunClient } from "./loadTestRun/loadTestRunClient.js";
export {
  LoadTestRunClientOptionalParams,
  CreateOrUpdateTestRunOptionalParams,
  CreateOrUpdateAppComponentsOptionalParams as LoadTestRunClientCreateOrUpdateAppComponentsOptionalParams,
  CreateOrUpdateServerMetricsConfigOptionalParams as LoadTestRunClientCreateOrUpdateServerMetricsConfigOptionalParams,
  DeleteTestRunOptionalParams,
  GetAppComponentsOptionalParams as LoadTestRunClientGetAppComponentsOptionalParams,
  GetServerMetricsConfigOptionalParams as LoadTestRunClientGetServerMetricsConfigOptionalParams,
  GetTestRunOptionalParams,
  GetTestRunFileOptionalParams,
  ListMetricDimensionValuesOptionalParams,
  ListMetricDefinitionsOptionalParams,
  ListMetricNamespacesOptionalParams,
  ListMetricsOptionalParams,
  ListTestRunsOptionalParams,
  StopTestRunOptionalParams,
} from "./loadTestRun/api/index.js";
export { TestProfileAdministrationClient } from "./testProfileAdministration/testProfileAdministrationClient.js";
export {
  CreateOrUpdateTestProfileOptionalParams,
  DeleteTestProfileOptionalParams,
  GetTestProfileOptionalParams,
  ListTestProfilesOptionalParams,
  TestProfileAdministrationClientOptionalParams,
} from "./testProfileAdministration/api/index.js";
export { TestProfileRunClient } from "./testProfileRun/testProfileRunClient.js";
export {
  CreateOrUpdateTestProfileRunOptionalParams,
  DeleteTestProfileRunOptionalParams,
  GetTestProfileRunOptionalParams,
  ListTestProfileRunsOptionalParams,
  StopTestProfileRunOptionalParams,
  TestProfileRunClientOptionalParams,
} from "./testProfileRun/api/index.js";
