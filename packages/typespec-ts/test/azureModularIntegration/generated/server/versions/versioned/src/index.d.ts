import { ClientOptions } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { Pipeline } from '@azure/core-rest-pipeline';

export declare enum KnownVersions {
    v2021_01_01_preview = "2021-01-01-preview",
    v2022_12_01_preview = "2022-12-01-preview"
}

export declare class VersionedClient {
    private _client;
    readonly pipeline: Pipeline;
    constructor(endpointParam: string, options?: VersionedClientOptionalParams);
    withQueryOldApiVersion(options?: WithQueryOldApiVersionOptionalParams): Promise<void>;
    withPathApiVersion(options?: WithPathApiVersionOptionalParams): Promise<void>;
    withQueryApiVersion(options?: WithQueryApiVersionOptionalParams): Promise<void>;
    withoutApiVersion(options?: WithoutApiVersionOptionalParams): Promise<void>;
}

export declare interface VersionedClientOptionalParams extends ClientOptions {
    apiVersion?: string;
}

export declare interface WithoutApiVersionOptionalParams extends OperationOptions {
}

export declare interface WithPathApiVersionOptionalParams extends OperationOptions {
}

export declare interface WithQueryApiVersionOptionalParams extends OperationOptions {
}

export declare interface WithQueryOldApiVersionOptionalParams extends OperationOptions {
}

export { }