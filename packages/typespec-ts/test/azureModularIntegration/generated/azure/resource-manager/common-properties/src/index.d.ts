import { ClientOptions } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { Pipeline } from '@azure/core-rest-pipeline';

export declare class CommonPropertiesClient {
    private _client;
    readonly pipeline: Pipeline;
    constructor(subscriptionId: string, options?: CommonPropertiesClientOptionalParams);
    updateWithUserAssignedAndSystemAssigned(resourceGroupName: string, managedIdentityTrackedResourceName: string, properties: ManagedIdentityTrackedResource, options?: UpdateWithUserAssignedAndSystemAssignedOptionalParams): Promise<ManagedIdentityTrackedResource>;
    createWithSystemAssigned(resourceGroupName: string, managedIdentityTrackedResourceName: string, resource: ManagedIdentityTrackedResource, options?: CreateWithSystemAssignedOptionalParams): Promise<ManagedIdentityTrackedResource>;
    get(resourceGroupName: string, managedIdentityTrackedResourceName: string, options?: GetOptionalParams): Promise<ManagedIdentityTrackedResource>;
}

export declare interface CommonPropertiesClientOptionalParams extends ClientOptions {
    apiVersion?: string;
}

export declare type CreatedByType = string;

export declare interface CreateWithSystemAssignedOptionalParams extends OperationOptions {
}

export declare interface ErrorAdditionalInfo {
    readonly type?: string;
    readonly info?: Record<string, any>;
}

export declare interface ErrorDetail {
    readonly code?: string;
    readonly message?: string;
    readonly target?: string;
    readonly details?: ErrorDetail[];
    readonly additionalInfo?: ErrorAdditionalInfo[];
}

export declare interface ErrorResponse {
    error?: ErrorDetail;
}

export declare interface GetOptionalParams extends OperationOptions {
}

export declare enum KnownCreatedByType {
    User = "User",
    Application = "Application",
    ManagedIdentity = "ManagedIdentity",
    Key = "Key"
}

export declare enum KnownManagedServiceIdentityType {
    None = "None",
    SystemAssigned = "SystemAssigned",
    UserAssigned = "UserAssigned",
    SystemAssignedUserAssigned = "SystemAssigned,UserAssigned"
}

export declare enum KnownVersions {
    V20231201Preview = "2023-12-01-preview"
}

export declare interface ManagedIdentityTrackedResource extends TrackedResource {
    properties?: ManagedIdentityTrackedResourceProperties;
    identity?: ManagedServiceIdentity;
}

export declare interface ManagedIdentityTrackedResourceProperties {
    readonly provisioningState: string;
}

export declare interface ManagedServiceIdentity {
    readonly principalId?: string;
    readonly tenantId?: string;
    type: ManagedServiceIdentityType;
    userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export declare type ManagedServiceIdentityType = string;

export declare interface Resource {
    readonly id?: string;
    readonly name?: string;
    readonly type?: string;
    readonly systemData?: SystemData;
}

export declare interface SystemData {
    createdBy?: string;
    createdByType?: CreatedByType;
    createdAt?: Date;
    lastModifiedBy?: string;
    lastModifiedByType?: CreatedByType;
    lastModifiedAt?: Date;
}

export declare interface TrackedResource extends Resource {
    tags?: Record<string, string>;
    location: string;
}

export declare interface UpdateWithUserAssignedAndSystemAssignedOptionalParams extends OperationOptions {
}

export declare interface UserAssignedIdentity {
    readonly clientId?: string;
    readonly principalId?: string;
}

export { }
