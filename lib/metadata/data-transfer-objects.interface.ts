import { ApiPropertyOptions } from '@nestjs/swagger';

export type DTOMetadataForm = {
    form?: DTOMetadataForm;
} & ApiPropertyOptions;

export interface DTOMetadata {
    name: string;
    form: DTOMetadataForm;
}
