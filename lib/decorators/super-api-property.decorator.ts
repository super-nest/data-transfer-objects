import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { SuperApiPropertyOptions } from '../metadata/data-transfer-objects.interface';

export const SuperApiProperty = (options?: SuperApiPropertyOptions) => {
    return applyDecorators(ApiProperty(options));
};
