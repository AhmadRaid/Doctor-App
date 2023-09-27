import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    if (!value) {
      return 0; // If the query parameter is not provided, return undefined
    }

    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        `Invalid ${metadata.type} ${metadata.data} parameter it must be a number : ${value}`,
      );
    }
    return parsedValue;
  }
}
