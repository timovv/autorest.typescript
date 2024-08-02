import { assert } from "chai";
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import path from "path";
import { emitModularModelsFromTypeSpec, emitModularOperationsFromTypeSpec } from "../util/emitUtil.js";
import { assertEqualContent } from "../util/testUtil.js";
import { format } from "prettier";
import { prettierTypeScriptOptions } from "../../src/lib.js";

const SCENARIOS_LOCATION = './test/modularUnit/scenarios';

const SCENARIOS_UPDATE = process.env["SCENARIOS_UPDATE"] === "true";

type EmitterFunction = (tsp: string, namedArgs: Record<string, string>) => Promise<string>;

/**
 * Mapping of different snapshot types to how to get them
 */
const OUTPUT_CODE_BLOCK_TYPES: Record<string, EmitterFunction> = {
  // Snapshot of a particular interface named {name} in the models file
  "(ts|typescript) models interface {name}": async (tsp, { name }) => {
    const result = await emitModularModelsFromTypeSpec(tsp);
    return result!.getInterfaceOrThrow(name ?? "No name specified!").getText();
  },

  // Snapshot of a particular function named {name} in the models file
  "(ts|typescript) models function {name}": async (tsp, { name })=> {
    const result = await emitModularModelsFromTypeSpec(tsp);
    return result!.getFunctionOrThrow(name ?? "No name specified!").getText();
  },

  // Snapshot of the entire models file
  "(ts|typescript) models": async (tsp) => {
    const result = await emitModularModelsFromTypeSpec(tsp);
    return result!.getFullText();
  },

  "(ts|typescript) models:withOptions interface {name}": async (tsp, { name }) => {
    const result = await emitModularModelsFromTypeSpec(tsp, true);
    return result!.getInterfaceOrThrow(name ?? "No name specified!").getText();
  },

  // Snapshot of the entire models file
  "(ts|typescript) models:withOptions": async (tsp) => {
    const result = await emitModularModelsFromTypeSpec(tsp, true);
    return result!.getFullText();
  },

  // Snapshot of the entire operations file for when there is only one operation group
  // Error if there is more than one operation group
  "(ts|typescript) operations": async (tsp) => {
    const result = await emitModularOperationsFromTypeSpec(tsp);
    assert.equal(result?.length, 1, "Expected exactly 1 source file");
    return result![0]!.getFullText();
  },
}

describe.only("Scenarios", function() {
  describeDir(SCENARIOS_LOCATION);
});

function describeDir(location: string) {
  const children = readdirSync(location);
  for(const child of children) {
    const fullPath = path.join(location, child);
    const stat = statSync(fullPath);
    if(stat.isDirectory()) {
      describe(child, function() {
        describeDir(fullPath);
      });
    } else {
      describeScenario(fullPath);
    }
  }
}

function describeScenario(scenarioFile: string) {
  let content = readFileSync(scenarioFile, { encoding: "utf-8" });
  const scenarioName = content.split('\n')[0]?.replace(/^#+\s+/, '') + (SCENARIOS_UPDATE ? " (WRITING)" : "");

  describe(scenarioName!, function() {
    const codeBlocks = getCodeBlocks(content);
    const typeSpecInput = codeBlocks.filter(x => x.type === "tsp" || x.type === "typespec").map(x => x.content).join("\n");
    const testCodeBlocks = codeBlocks.filter(x => x.type !== "tsp" && x.type !== "typespec");
    
    for(const codeBlock of testCodeBlocks) {
      let tested = false;
      for(const [template, fn] of Object.entries(OUTPUT_CODE_BLOCK_TYPES)) {
        // Create a named capture group for each template argument 
        const templateRegex = new RegExp("^" + template.replace(/\{(\w+)\}/g, "(?<$1>\\w+)") + "$");
        const match = codeBlock.type.match(templateRegex);

        if(match !== null) {
          const namedArgs = match.groups;

          it(codeBlock.type, async function() {
            const result = await fn(typeSpecInput, namedArgs ?? {}, []);

            if(SCENARIOS_UPDATE) {
              content = updateCodeBlock(content, codeBlock.type, (await format(result, prettierTypeScriptOptions)).trim());
            } else {
              await assertEqualContent(codeBlock.content, result);
            }
          });

          tested = true;
        }
      }

      if(!tested) {
        // Empty test case to mark it as skipped
        it.skip(codeBlock.type, function() {});
      }
    }

    // Update after all the tests in the scenario if write mode was enabled
    after(function() {
      if(SCENARIOS_UPDATE) {
        writeFileSync(scenarioFile, content);
      }
    })
  });
}

interface CodeBlock {
  content: string;
  type: string;
}

function getCodeBlocks(file: string): CodeBlock[] {
  const matches = file.matchAll(/^```(?<type>[^\n]+)\n(?<content>(.|\n)*?)```$/gm);

  return [...matches].map(match => ({
    content: match.groups!["content"]!,
    type: match.groups!["type"]!,
  }));
}

function updateCodeBlock(file: string, codeBlockHeading: string, newContent: string): string {
  const lines = file.split('\n');
  const start = lines.indexOf("```" + codeBlockHeading) + 1;
  const end = lines.indexOf("```", start);

  return [
    ...lines.slice(0, start),
    newContent,
    ...lines.slice(end)
  ].join('\n');
}