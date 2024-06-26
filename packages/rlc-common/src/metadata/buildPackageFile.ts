// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { buildFlavorlessPackage } from "./packageJson/buildFlavorlessPackage.js";
import { RLCModel } from "../interfaces.js";
import { PackageCommonInfoConfig } from "./packageJson/packageCommon.js";
import { buildAzureMonorepoPackage } from "./packageJson/buildAzureMonorepoPackage.js";
import { normalizeName, NameType } from "../helpers/nameUtils.js";
import { getRelativePartFromSrcPath } from "../helpers/pathUtils.js";
import {
  hasPagingOperations,
  hasPollingOperations
} from "../helpers/operationHelpers.js";
import { buildAzureStandalonePackage } from "./packageJson/buildAzureStandalonePackage.js";
import { Project } from "ts-morph";

export function buildPackageFile(
  model: RLCModel,
  exports?: Record<string, any>
) {
  const config: PackageCommonInfoConfig = {
    description: getDescription(model),
    moduleKind: model.options?.moduleKind ?? "esm",
    name: getPackageName(model),
    version: getPackageVersion(model),
    withSamples: model.options?.generateSample === true,
    withTests: model.options?.generateTest === true,
    nameWithoutScope: model.options?.packageDetails?.nameWithoutScope,
    exports
  };

  let packageInfo: Record<string, any> = buildFlavorlessPackage(config);

  const extendedConfig = {
    ...config,
    clientFilePaths: [getClientFilePath(model)],
    hasLro: hasPollingOperations(model),
    hasPaging: hasPagingOperations(model),
    monorepoPackageDirectory: model.options?.azureOutputDirectory,
    specSource: model.options?.sourceFrom ?? "TypeSpec"
  };

  if (isAzureMonorepoPackage(model)) {
    packageInfo = buildAzureMonorepoPackage(extendedConfig);
  }

  if (isAzureStandalonePackage(model)) {
    packageInfo = buildAzureStandalonePackage(extendedConfig);
  }

  const project = new Project();
  const filePath = "package.json";

  if (!packageInfo) {
    return;
  }

  const packageFile = project.createSourceFile(
    filePath,
    JSON.stringify(packageInfo, null, 2),
    {
      overwrite: true
    }
  );
  return {
    path: filePath,
    content: packageFile.getFullText()
  };
}

function getPackageVersion(model: RLCModel): string {
  return model.options?.packageDetails?.version ?? "1.0.0-beta.1";
}

function getDescription(model: RLCModel): string {
  const description = model.options?.packageDetails?.description;
  if (!description) {
    return `A generated SDK for ${model.libraryName}.`;
  }
  return description;
}

function getPackageName(model: RLCModel): string {
  return model.options?.packageDetails?.name ?? model.libraryName;
}

function isAzureMonorepoPackage(model: RLCModel): boolean {
  return (
    Boolean(model.options?.azureSdkForJs) &&
    Boolean(model.options?.flavor === "azure")
  );
}

function isAzureStandalonePackage(model: RLCModel): boolean {
  return (
    Boolean(model.options?.flavor === "azure") && !model.options?.azureSdkForJs
  );
}

function getClientFilePath(model: RLCModel) {
  const { srcPath } = model;
  const sdkReletivePart = getRelativePartFromSrcPath(srcPath);
  const clientFilename = normalizeName(model.libraryName, NameType.File);
  return sdkReletivePart
    ? `src/${sdkReletivePart}/${clientFilename}.ts`
    : `src/${clientFilename}.ts`;
}
