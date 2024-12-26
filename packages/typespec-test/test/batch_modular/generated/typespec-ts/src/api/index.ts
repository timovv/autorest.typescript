// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createBatch,
  BatchContext,
  BatchClientOptionalParams,
} from "./batchContext.js";
export {
  listNodeFiles,
  getNodeFileProperties,
  getNodeFile,
  deleteNodeFile,
  listNodeExtensions,
  getNodeExtension,
  listNodes,
  uploadNodeLogs,
  getNodeRemoteDesktopFile,
  getNodeRemoteLoginSettings,
  enableNodeScheduling,
  disableNodeScheduling,
  reimageNode,
  rebootNode,
  getNode,
  replaceNodeUser,
  deleteNodeUser,
  createNodeUser,
  listTaskFiles,
  getTaskFileProperties,
  getTaskFile,
  deleteTaskFile,
  reactivateTask,
  terminateTask,
  listSubTasks,
  replaceTask,
  getTask,
  deleteTask,
  createTaskCollection,
  listTasks,
  createTask,
  listJobSchedules,
  createJobSchedule,
  terminateJobSchedule,
  enableJobSchedule,
  disableJobSchedule,
  replaceJobSchedule,
  updateJobSchedule,
  getJobSchedule,
  deleteJobSchedule,
  jobScheduleExists,
  getCertificate,
  deleteCertificate,
  cancelCertificateDeletion,
  listCertificates,
  createCertificate,
  getJobTaskCounts,
  listJobPreparationAndReleaseTaskStatus,
  listJobsFromSchedule,
  listJobs,
  createJob,
  terminateJob,
  enableJob,
  disableJob,
  replaceJob,
  updateJob,
  getJob,
  deleteJob,
  listPoolNodeCounts,
  listSupportedImages,
  removeNodes,
  replacePoolProperties,
  stopPoolResize,
  resizePool,
  evaluatePoolAutoScale,
  enablePoolAutoScale,
  disablePoolAutoScale,
  updatePool,
  getPool,
  poolExists,
  deletePool,
  listPools,
  createPool,
  listPoolUsageMetrics,
  getApplication,
  listApplications,
} from "./operations.js";
export {
  ListNodeFilesOptionalParams,
  GetNodeFilePropertiesOptionalParams,
  GetNodeFileOptionalParams,
  DeleteNodeFileOptionalParams,
  ListNodeExtensionsOptionalParams,
  GetNodeExtensionOptionalParams,
  ListNodesOptionalParams,
  UploadNodeLogsOptionalParams,
  GetNodeRemoteDesktopFileOptionalParams,
  GetNodeRemoteLoginSettingsOptionalParams,
  EnableNodeSchedulingOptionalParams,
  DisableNodeSchedulingOptionalParams,
  ReimageNodeOptionalParams,
  RebootNodeOptionalParams,
  GetNodeOptionalParams,
  ReplaceNodeUserOptionalParams,
  DeleteNodeUserOptionalParams,
  CreateNodeUserOptionalParams,
  ListTaskFilesOptionalParams,
  GetTaskFilePropertiesOptionalParams,
  GetTaskFileOptionalParams,
  DeleteTaskFileOptionalParams,
  ReactivateTaskOptionalParams,
  TerminateTaskOptionalParams,
  ListSubTasksOptionalParams,
  ReplaceTaskOptionalParams,
  GetTaskOptionalParams,
  DeleteTaskOptionalParams,
  CreateTaskCollectionOptionalParams,
  ListTasksOptionalParams,
  CreateTaskOptionalParams,
  ListJobSchedulesOptionalParams,
  CreateJobScheduleOptionalParams,
  TerminateJobScheduleOptionalParams,
  EnableJobScheduleOptionalParams,
  DisableJobScheduleOptionalParams,
  ReplaceJobScheduleOptionalParams,
  UpdateJobScheduleOptionalParams,
  GetJobScheduleOptionalParams,
  DeleteJobScheduleOptionalParams,
  JobScheduleExistsOptionalParams,
  GetCertificateOptionalParams,
  DeleteCertificateOptionalParams,
  CancelCertificateDeletionOptionalParams,
  ListCertificatesOptionalParams,
  CreateCertificateOptionalParams,
  GetJobTaskCountsOptionalParams,
  ListJobPreparationAndReleaseTaskStatusOptionalParams,
  ListJobsFromScheduleOptionalParams,
  ListJobsOptionalParams,
  CreateJobOptionalParams,
  TerminateJobOptionalParams,
  EnableJobOptionalParams,
  DisableJobOptionalParams,
  ReplaceJobOptionalParams,
  UpdateJobOptionalParams,
  GetJobOptionalParams,
  DeleteJobOptionalParams,
  ListPoolNodeCountsOptionalParams,
  ListSupportedImagesOptionalParams,
  RemoveNodesOptionalParams,
  ReplacePoolPropertiesOptionalParams,
  StopPoolResizeOptionalParams,
  ResizePoolOptionalParams,
  EvaluatePoolAutoScaleOptionalParams,
  EnablePoolAutoScaleOptionalParams,
  DisablePoolAutoScaleOptionalParams,
  UpdatePoolOptionalParams,
  GetPoolOptionalParams,
  PoolExistsOptionalParams,
  DeletePoolOptionalParams,
  ListPoolsOptionalParams,
  CreatePoolOptionalParams,
  ListPoolUsageMetricsOptionalParams,
  GetApplicationOptionalParams,
  ListApplicationsOptionalParams,
} from "./options.js";
