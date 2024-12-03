import { ApiPropertyOptions } from '@nestjs/swagger';

export type SuperApiPropertyOptions = {
    form?: SuperApiPropertyOptions;
    cms?: {
        ref?: string;
        isShow?: boolean;
        widget?: 'textarea' | 'password' | 'textEditor';
    };
} & ApiPropertyOptions;

export interface DTOMetadata {
    name: string;
    form: SuperApiPropertyOptions;
}
