# Should generate samples for disabled hierarchy client and enabled operation group

Sample generation should handle hierarchy client successfully.

## TypeSpec

This is tsp definition.

```tsp
model A {
  prop1: string;
}

@route("b")
namespace B {
  model A {
    prop2: string;
  }
  interface C {
    op foo(@body body: A):  { @body body: {}};
  }
}

@route("/d")
interface D {
  op bar(@body body: A):  { @body body: {}};
}
```

This is the tspconfig.yaml.

```yaml
hierarchy-client: false
enable-operation-group: true
```

## Provide examples and generated samples

Raw json files.

```json for bar
{
  "title": "bar",
  "operationId": "D_bar",
  "parameters": {
    "body": {
      "prop1": "body name"
    }
  },
  "responses": {
    "200": {}
  }
}
```

Generated samples.

```ts samples
/** This file path is /samples-dev/dBarSample.ts */
import { TestingClient } from "@azure/internal-test";

/**
 * This sample demonstrates how to execute bar
 *
 * @summary execute bar
 * x-ms-original-file: 2021-10-01-preview/json_for_bar.json
 */
async function bar(): Promise<void> {
  const client = new TestingClient();
  const result = await client.d.bar({ prop1: "body name" });
  console.log(result);
}

async function main(): Promise<void> {
  await bar();
}

main().catch(console.error);
```

Raw json files.

```json for foo
{
  "title": "foo",
  "operationId": "C_foo",
  "parameters": {
    "body": {
      "prop2": "body name"
    }
  },
  "responses": {
    "200": {}
  }
}
```

Generated samples.

```ts samples
/** This file path is /samples-dev/cFooSample.ts */
import { TestingClient } from "@azure/internal-test";

/**
 * This sample demonstrates how to execute foo
 *
 * @summary execute foo
 * x-ms-original-file: 2021-10-01-preview/json_for_foo.json
 */
async function foo(): Promise<void> {
  const client = new TestingClient();
  const result = await client.c.foo({ prop2: "body name" });
  console.log(result);
}

async function main(): Promise<void> {
  await foo();
}

main().catch(console.error);
```
