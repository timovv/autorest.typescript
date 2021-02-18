import * as coreHttp from "@azure/core-http";
import { ApiVersion72Preview, KeyVaultClientOptionalParams } from "./models";

const packageName = "@azure/keyvault-secrets";
const packageVersion = "1.0.0-preview1";

export class KeyVaultClientContext extends coreHttp.ServiceClient {
  apiVersion: ApiVersion72Preview;

  /**
   * Initializes a new instance of the KeyVaultClientContext class.
   * @param apiVersion Api Version
   * @param options The parameter options
   */
  constructor(
    apiVersion: ApiVersion72Preview,
    options?: KeyVaultClientOptionalParams
  ) {
    if (apiVersion === undefined) {
      throw new Error("'apiVersion' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(undefined, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "{vaultBaseUrl}";

    // Parameter assignments
    this.apiVersion = apiVersion;
  }
}