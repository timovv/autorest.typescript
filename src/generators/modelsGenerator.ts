// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientDetails } from "../models/clientDetails";
import { Project, PropertySignatureStructure, StructureKind } from "ts-morph";

export function generateModels(clientDetails: ClientDetails, project: Project) {
  const modelsIndexFile = project.createSourceFile(
    "src/models/index.ts",
    undefined,
    { overwrite: true }
  );

  modelsIndexFile.addImportDeclaration({
    namespaceImport: "coreHttp",
    moduleSpecifier: "@azure/core-http"
  });

  for (const model of clientDetails.models) {
    modelsIndexFile.addInterface({
      name: model.name,
      docs: [model.description],
      isExported: true,
      properties: model.properties
        .filter(p => !p.isConstant)
        .map<PropertySignatureStructure>(p => ({
          name: p.name,
          hasQuestionToken: !p.required,
          isReadonly: p.readOnly,
          type: p.type,
          docs: p.description ? [p.description] : undefined,
          kind: StructureKind.PropertySignature
        }))
    });
  }

  for (const union of clientDetails.unions) {
    modelsIndexFile.addTypeAlias({
      name: union.name,
      docs: [union.description],
      isExported: true,
      type: union.values.join(" | "),
      trailingTrivia: writer => writer.newLine()
    });
  }
}