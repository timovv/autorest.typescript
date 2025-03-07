import { assert } from "chai";
import PageableClientFactory, {
  PageableClient
} from "./generated/payload/pageable/src/index.js";

describe("Pageable Client", () => {
  let client: PageableClient;

  beforeEach(() => {
    client = PageableClientFactory({
      allowInsecureConnection: true
    });
  });

  // Not support, pending on https://github.com/Azure/autorest.typescript/issues/3022
  it.skip("should get pagable Server Driven Pagination link", async () => {
    const result = await client
      .path("/payload/pageable/server-driven-pagination/link")
      .get();
    assert.strictEqual(result.status, "200");
    assert.strictEqual(result.body.pets[0]?.id, "1");
    assert.strictEqual(result.body.pets[0]?.name, "dog");
    assert.strictEqual(result.body.pets[1]?.id, "2");
    assert.strictEqual(result.body.pets[1]?.name, "cat");
    assert.strictEqual(
      result.body.next,
      "http://localhost:3000/payload/pageable/server-driven-pagination/link/nextPage"
    );
  });
});
