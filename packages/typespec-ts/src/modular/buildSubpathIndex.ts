import { join } from "path";
import { Client, ModularCodeModel } from "./modularCodeModel.js";

export interface buildSubpathIndexFileOptions {
  exportIndex?: boolean;
  interfaceOnly?: boolean;
}

export function buildSubpathIndexFile(
  client: Client,
  codeModel: ModularCodeModel,
  subpath: string,
  options: buildSubpathIndexFileOptions = {}
) {
  const { subfolder } = client;
  const srcPath = codeModel.modularOptions.sourceRoot;
  // Skip to export these files because they are used internally.
  const skipFiles = ["pagingHelpers.ts", "pollingHelpers.ts"];
  const apiFilePattern = join(srcPath, client.subfolder ?? "", subpath);
  const apiFiles = codeModel.project.getSourceFiles().filter((file) => {
    return file
      .getFilePath()
      .replace(/\\/g, "/")
      .startsWith(apiFilePattern.replace(/\\/g, "/"));
  });
  if (apiFiles.length === 0) {
    return;
  }
  const indexFile = codeModel.project.createSourceFile(
    `${srcPath}/${subfolder}/${subpath}/index.ts`
  );
  for (const file of apiFiles) {
    if (!options.exportIndex && file.getFilePath().endsWith("index.ts")) {
      continue;
    }
    // Skip to export these files because they are used internally.
    if (skipFiles.some((skipFile) => file.getFilePath().endsWith(skipFile))) {
      continue;
    }
    if (file.getFilePath() === indexFile.getFilePath()) {
      continue;
    }

    let namedExports: string[] = [...file.getExportedDeclarations().entries()]
      .filter((exDeclaration) => {
        if (exDeclaration[0].startsWith("_")) {
          return false;
        }
        return exDeclaration[1].some((ex) => {
          if (
            options.interfaceOnly &&
            ex.getKindName() !== "InterfaceDeclaration"
          ) {
            return false;
          }

          // skip exporting serializers for models
          if (
            subpath === "models" &&
            ex.getKindName() === "FunctionDeclaration" &&
            exDeclaration[0].endsWith("Serializer")
          ) {
            return false;
          }

          return true;
        });
      })
      .map((exDeclaration) => {
        return exDeclaration[0];
      });
    // Skip to export PagedResult and BuildPagedAsyncIteratorOptions
    if (file.getFilePath().endsWith("pagingTypes.ts")) {
      namedExports = namedExports.filter(
        (ex) => !["PagedResult", "BuildPagedAsyncIteratorOptions"].includes(ex)
      );
    }
    indexFile.addExportDeclaration({
      moduleSpecifier: `.${file
        .getFilePath()
        .replace(indexFile.getDirectoryPath(), "")
        .replace(/\\/g, "/")
        .replace(".ts", "")}.js`,
      namedExports
    });
  }
}
