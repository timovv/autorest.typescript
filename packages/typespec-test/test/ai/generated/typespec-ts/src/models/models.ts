// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CodeInterpreterToolDefinition,
  FileSearchToolDefinition,
  ThreadStreamEvent,
  RunStreamEvent,
  RunStepStreamEvent,
  MessageStreamEvent,
  ErrorEvent,
  DoneEvent,
} from "./agents/models.js";

/** Evaluation Definition */
export interface Evaluation {
  /** Identifier of the evaluation. */
  readonly id: string;
  /** Data for evaluation. */
  data: InputDataUnion;
  /** Display Name for evaluation. It helps to find evaluation easily in AI Studio. It does not need to be unique. */
  displayName?: string;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Status of the evaluation. It is set by service and is read-only. */
  readonly status?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfiguration>;
}

export function evaluationSerializer(item: Evaluation): any {
  return {
    data: inputDataUnionSerializer(item["data"]),
    displayName: item["displayName"],
    description: item["description"],
    tags: item["tags"],
    properties: item["properties"],
    evaluators: evaluatorConfigurationRecordSerializer(item["evaluators"]),
  };
}

export function evaluationDeserializer(item: any): Evaluation {
  return {
    id: item["id"],
    data: inputDataUnionDeserializer(item["data"]),
    displayName: item["displayName"],
    description: item["description"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    status: item["status"],
    tags: item["tags"],
    properties: item["properties"],
    evaluators: evaluatorConfigurationRecordDeserializer(item["evaluators"]),
  };
}

/** Abstract data class for input data configuration. */
export interface InputData {
  /** Type of the data. */
  /** The discriminator possible values: app_insights, dataset */
  type: string;
}

export function inputDataSerializer(item: InputData): any {
  return { type: item["type"] };
}

export function inputDataDeserializer(item: any): InputData {
  return {
    type: item["type"],
  };
}

/** Alias for InputDataUnion */
export type InputDataUnion = AppInsightsConfiguration | Dataset | InputData;

export function inputDataUnionSerializer(item: InputDataUnion): any {
  switch (item.type) {
    case "app_insights":
      return appInsightsConfigurationSerializer(
        item as AppInsightsConfiguration,
      );

    case "dataset":
      return datasetSerializer(item as Dataset);

    default:
      return inputDataSerializer(item);
  }
}

export function inputDataUnionDeserializer(item: any): InputDataUnion {
  switch (item.type) {
    case "app_insights":
      return appInsightsConfigurationDeserializer(
        item as AppInsightsConfiguration,
      );

    case "dataset":
      return datasetDeserializer(item as Dataset);

    default:
      return inputDataDeserializer(item);
  }
}

/** Data Source for Application Insight. */
export interface AppInsightsConfiguration extends InputData {
  readonly type: "app_insights";
  /** LogAnalytic Workspace resourceID associated with AppInsights */
  resourceId: string;
  /** Query to fetch the data. */
  query: string;
  /** Service name. */
  serviceName: string;
}

export function appInsightsConfigurationSerializer(
  item: AppInsightsConfiguration,
): any {
  return {
    resourceId: item["resourceId"],
    query: item["query"],
    serviceName: item["serviceName"],
  };
}

export function appInsightsConfigurationDeserializer(
  item: any,
): AppInsightsConfiguration {
  return {
    type: item["type"],
    resourceId: item["resourceId"],
    query: item["query"],
    serviceName: item["serviceName"],
  };
}

/** Dataset as source for evaluation. */
export interface Dataset extends InputData {
  readonly type: "dataset";
  /** Evaluation input data */
  id: string;
}

export function datasetSerializer(item: Dataset): any {
  return { id: item["id"] };
}

export function datasetDeserializer(item: any): Dataset {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The timestamp the resource was created at. */
  readonly createdAt?: Date;
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The identity type that created the resource. */
  readonly createdByType?: string;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdAt: !item["createdAt"]
      ? item["createdAt"]
      : new Date(item["createdAt"]),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

export function evaluatorConfigurationRecordSerializer(
  item: Record<string, EvaluatorConfiguration>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : evaluatorConfigurationSerializer(item[key]);
  });
  return result;
}

export function evaluatorConfigurationRecordDeserializer(
  item: Record<string, any>,
): Record<string, EvaluatorConfiguration> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : evaluatorConfigurationDeserializer(item[key]);
  });
  return result;
}

/** Evaluator Configuration */
export interface EvaluatorConfiguration {
  /** Identifier of the evaluator. */
  id: string;
  /** Initialization parameters of the evaluator. */
  initParams?: Record<string, any>;
  /** Data parameters of the evaluator. */
  dataMapping?: Record<string, string>;
}

export function evaluatorConfigurationSerializer(
  item: EvaluatorConfiguration,
): any {
  return {
    id: item["id"],
    initParams: item["initParams"],
    dataMapping: item["dataMapping"],
  };
}

export function evaluatorConfigurationDeserializer(
  item: any,
): EvaluatorConfiguration {
  return {
    id: item["id"],
    initParams: item["initParams"],
    dataMapping: item["dataMapping"],
  };
}

/** Paged collection of Evaluation items */
export interface _PagedEvaluation {
  /** The Evaluation items on this page */
  value: Evaluation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEvaluationDeserializer(item: any): _PagedEvaluation {
  return {
    value: evaluationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function evaluationArraySerializer(result: Array<Evaluation>): any[] {
  return result.map((item) => {
    return evaluationSerializer(item);
  });
}

export function evaluationArrayDeserializer(result: Array<Evaluation>): any[] {
  return result.map((item) => {
    return evaluationDeserializer(item);
  });
}

/** Evaluation Schedule Definition */
export interface EvaluationSchedule {
  /** Identifier of the evaluation. */
  readonly id: string;
  /** Data for evaluation. */
  data: InputDataUnion;
  /** Display Name for evaluation. It helps to find evaluation easily in AI Studio. It does not need to be unique. */
  displayName?: string;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Status of the evaluation. It is set by service and is read-only. */
  readonly provisioningStatus?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfiguration>;
  /** Trigger for the evaluation. */
  trigger: TriggerUnion;
  /** Sampling strategy for the evaluation. */
  samplingStrategy: SamplingStrategy;
}

export function evaluationScheduleSerializer(item: EvaluationSchedule): any {
  return {
    data: inputDataUnionSerializer(item["data"]),
    displayName: item["displayName"],
    description: item["description"],
    tags: item["tags"],
    properties: item["properties"],
    evaluators: evaluatorConfigurationRecordSerializer(item["evaluators"]),
    trigger: triggerUnionSerializer(item["trigger"]),
    samplingStrategy: samplingStrategySerializer(item["samplingStrategy"]),
  };
}

export function evaluationScheduleDeserializer(item: any): EvaluationSchedule {
  return {
    id: item["id"],
    data: inputDataUnionDeserializer(item["data"]),
    displayName: item["displayName"],
    description: item["description"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    provisioningStatus: item["provisioningStatus"],
    tags: item["tags"],
    properties: item["properties"],
    evaluators: evaluatorConfigurationRecordDeserializer(item["evaluators"]),
    trigger: triggerUnionDeserializer(item["trigger"]),
    samplingStrategy: samplingStrategyDeserializer(item["samplingStrategy"]),
  };
}

/** Abstract data class for input data configuration. */
export interface Trigger {
  /** Type of the trigger. */
  /** The discriminator possible values: Recurrence, Cron */
  type: string;
}

export function triggerSerializer(item: Trigger): any {
  return { type: item["type"] };
}

export function triggerDeserializer(item: any): Trigger {
  return {
    type: item["type"],
  };
}

/** Alias for TriggerUnion */
export type TriggerUnion = RecurrenceTrigger | CronTrigger | Trigger;

export function triggerUnionSerializer(item: TriggerUnion): any {
  switch (item.type) {
    case "Recurrence":
      return recurrenceTriggerSerializer(item as RecurrenceTrigger);

    case "Cron":
      return cronTriggerSerializer(item as CronTrigger);

    default:
      return triggerSerializer(item);
  }
}

export function triggerUnionDeserializer(item: any): TriggerUnion {
  switch (item.type) {
    case "Recurrence":
      return recurrenceTriggerDeserializer(item as RecurrenceTrigger);

    case "Cron":
      return cronTriggerDeserializer(item as CronTrigger);

    default:
      return triggerDeserializer(item);
  }
}

/** Recurrence Trigger Definition */
export interface RecurrenceTrigger extends Trigger {
  readonly type: "Recurrence";
  /** The frequency to trigger schedule. */
  frequency: Frequency;
  /** Specifies schedule interval in conjunction with frequency */
  interval: number;
  /** The recurrence schedule. */
  schedule: RecurrenceSchedule;
}

export function recurrenceTriggerSerializer(item: RecurrenceTrigger): any {
  return {
    frequency: item["frequency"],
    interval: item["interval"],
    schedule: recurrenceScheduleSerializer(item["schedule"]),
  };
}

export function recurrenceTriggerDeserializer(item: any): RecurrenceTrigger {
  return {
    type: item["type"],
    frequency: item["frequency"],
    interval: item["interval"],
    schedule: recurrenceScheduleDeserializer(item["schedule"]),
  };
}

/** Frequency of the schedule - day, week, month, hour, minute */
export type Frequency = "Month" | "Week" | "Day" | "Hour" | "Minute";

/** RecurrenceSchedule Definition */
export interface RecurrenceSchedule {
  /** List of hours for the schedule. */
  hours: number[];
  /** List of minutes for the schedule. */
  minutes: number[];
  /** List of days for the schedule. */
  weekDays: WeekDays[];
  /** List of month days for the schedule */
  monthDays: number[];
}

export function recurrenceScheduleSerializer(item: RecurrenceSchedule): any {
  return {
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
    weekDays: item["weekDays"].map((p: any) => {
      return p;
    }),
    monthDays: item["monthDays"].map((p: any) => {
      return p;
    }),
  };
}

export function recurrenceScheduleDeserializer(item: any): RecurrenceSchedule {
  return {
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
    weekDays: item["weekDays"].map((p: any) => {
      return p;
    }),
    monthDays: item["monthDays"].map((p: any) => {
      return p;
    }),
  };
}

/** WeekDay of the schedule - Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday */
export type WeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/** Cron Trigger Definition */
export interface CronTrigger extends Trigger {
  readonly type: "Cron";
  /** Cron expression for the trigger. */
  expression: string;
}

export function cronTriggerSerializer(item: CronTrigger): any {
  return { expression: item["expression"] };
}

export function cronTriggerDeserializer(item: any): CronTrigger {
  return {
    type: item["type"],
    expression: item["expression"],
  };
}

/** SamplingStrategy Definition */
export interface SamplingStrategy {
  /** Sampling rate */
  rate: number;
}

export function samplingStrategySerializer(item: SamplingStrategy): any {
  return { rate: item["rate"] };
}

export function samplingStrategyDeserializer(item: any): SamplingStrategy {
  return {
    rate: item["rate"],
  };
}

/** Paged collection of EvaluationSchedule items */
export interface _PagedEvaluationSchedule {
  /** The EvaluationSchedule items on this page */
  value: EvaluationSchedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEvaluationScheduleDeserializer(
  item: any,
): _PagedEvaluationSchedule {
  return {
    value: evaluationScheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function evaluationScheduleArraySerializer(
  result: Array<EvaluationSchedule>,
): any[] {
  return result.map((item) => {
    return evaluationScheduleSerializer(item);
  });
}

export function evaluationScheduleArrayDeserializer(
  result: Array<EvaluationSchedule>,
): any[] {
  return result.map((item) => {
    return evaluationScheduleDeserializer(item);
  });
}

/** Response from the list operation */
export interface ConnectionsListResponse {
  /** A list of connection list secrets */
  value: ConnectionsListSecretsResponse[];
}

export function connectionsListResponseDeserializer(
  item: any,
): ConnectionsListResponse {
  return {
    value: connectionsListSecretsResponseArrayDeserializer(item["value"]),
  };
}

export function connectionsListSecretsResponseArrayDeserializer(
  result: Array<ConnectionsListSecretsResponse>,
): any[] {
  return result.map((item) => {
    return connectionsListSecretsResponseDeserializer(item);
  });
}

/** Response from the listSecrets operation */
export interface ConnectionsListSecretsResponse {
  /** A unique identifier for the connection */
  id: string;
  /** The name of the resource */
  name: string;
  /** The properties of the resource */
  properties: ConnectionPropertiesUnion;
}

export function connectionsListSecretsResponseDeserializer(
  item: any,
): ConnectionsListSecretsResponse {
  return {
    id: item["id"],
    name: item["name"],
    properties: connectionPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Connection properties */
export interface ConnectionProperties {
  /** Authentication type of the connection target */
  /** The discriminator possible values: ApiKey, AAD, SAS */
  authType: AuthenticationType;
}

export function connectionPropertiesDeserializer(
  item: any,
): ConnectionProperties {
  return {
    authType: item["authType"],
  };
}

/** Alias for ConnectionPropertiesUnion */
export type ConnectionPropertiesUnion =
  | ConnectionPropertiesApiKeyAuth
  | ConnectionPropertiesAADAuth
  | ConnectionPropertiesSASAuth
  | ConnectionProperties;

export function connectionPropertiesUnionDeserializer(
  item: any,
): ConnectionPropertiesUnion {
  switch (item.authType) {
    case "ApiKey":
      return connectionPropertiesApiKeyAuthDeserializer(
        item as ConnectionPropertiesApiKeyAuth,
      );

    case "AAD":
      return connectionPropertiesAADAuthDeserializer(
        item as ConnectionPropertiesAADAuth,
      );

    case "SAS":
      return connectionPropertiesSASAuthDeserializer(
        item as ConnectionPropertiesSASAuth,
      );

    default:
      return connectionPropertiesDeserializer(item);
  }
}

/** Authentication type used by Azure AI service to connect to another service */
export type AuthenticationType = "ApiKey" | "AAD" | "SAS";

/** Connection properties for connections with API key authentication */
export interface ConnectionPropertiesApiKeyAuth extends ConnectionProperties {
  /** Authentication type of the connection target */
  authType: "ApiKey";
  /** Category of the connection */
  category: ConnectionType;
  /** Credentials will only be present for authType=ApiKey */
  credentials: CredentialsApiKeyAuth;
  /** The connection URL to be used for this service */
  target: string;
}

export function connectionPropertiesApiKeyAuthDeserializer(
  item: any,
): ConnectionPropertiesApiKeyAuth {
  return {
    authType: item["authType"],
    category: item["category"],
    credentials: credentialsApiKeyAuthDeserializer(item["credentials"]),
    target: item["target"],
  };
}

/** The Type (or category) of the connection */
export type ConnectionType =
  | "AzureOpenAI"
  | "Serverless"
  | "AzureBlob"
  | "AIServices";

/** The credentials needed for API key authentication */
export interface CredentialsApiKeyAuth {
  /** The API key */
  key: string;
}

export function credentialsApiKeyAuthDeserializer(
  item: any,
): CredentialsApiKeyAuth {
  return {
    key: item["key"],
  };
}

/** Connection properties for connections with AAD authentication (aka `Entra ID passthrough`) */
export interface ConnectionPropertiesAADAuth extends ConnectionProperties {
  /** Authentication type of the connection target */
  authType: "AAD";
  /** Category of the connection */
  category: ConnectionType;
  /** The connection URL to be used for this service */
  target: string;
}

export function connectionPropertiesAADAuthDeserializer(
  item: any,
): ConnectionPropertiesAADAuth {
  return {
    authType: item["authType"],
    category: item["category"],
    target: item["target"],
  };
}

/** Connection properties for connections with SAS authentication */
export interface ConnectionPropertiesSASAuth extends ConnectionProperties {
  /** Authentication type of the connection target */
  authType: "SAS";
  /** Category of the connection */
  category: ConnectionType;
  /** Credentials will only be present for authType=ApiKey */
  credentials: CredentialsSASAuth;
  /** The connection URL to be used for this service */
  target: string;
}

export function connectionPropertiesSASAuthDeserializer(
  item: any,
): ConnectionPropertiesSASAuth {
  return {
    authType: item["authType"],
    category: item["category"],
    credentials: credentialsSASAuthDeserializer(item["credentials"]),
    target: item["target"],
  };
}

/** The credentials needed for Shared Access Signatures (SAS) authentication */
export interface CredentialsSASAuth {
  /** The Shared Access Signatures (SAS) token */
  sas: string;
}

export function credentialsSASAuthDeserializer(item: any): CredentialsSASAuth {
  return {
    sas: item["SAS"],
  };
}

/** Alias for _MessageAttachmentTool */
export type _MessageAttachmentTool =
  | CodeInterpreterToolDefinition
  | FileSearchToolDefinition;

export function _messageAttachmentToolSerializer(
  item: _MessageAttachmentTool,
): any {
  return item;
}

export function _messageAttachmentToolDeserializer(
  item: any,
): _MessageAttachmentTool {
  return item;
}

/** Alias for _ */
export type _ =
  | ThreadStreamEvent
  | RunStreamEvent
  | RunStepStreamEvent
  | MessageStreamEvent
  | ErrorEvent
  | DoneEvent;

/** Azure AI API versions */
export enum KnownVersions {
  /** Azure AI API version 2024-07-01-preview. */
  "2024-07-01-preview" = "2024-07-01-preview",
}
