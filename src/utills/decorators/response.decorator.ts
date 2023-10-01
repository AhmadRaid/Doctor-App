import { SetMetadata } from '@nestjs/common';

/**
 * A unique key used to identify metadata added by the ApiResponseDecorator.
 */
export const ApiResponseMetadataKey = 'api-response';

/**
 * Decorator to add metadata for standardized API responses.
 * @param httpCode - The HTTP status code to include in the metadata.
 * @param success - Whether the response indicates success or failure.
 * @param message - The message to include in the metadata.
 * @returns A metadata object with the provided information.
 */

export const ApiResponseDecorator = (
  httpCode: number,
  success: boolean,
  message: string,
) => SetMetadata(ApiResponseMetadataKey, { httpCode, success, message });
