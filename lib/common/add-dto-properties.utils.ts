import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { DTOMetadataStorage } from '../storages/data-transfer-objects.storage';
import {
    DTOMetadata,
    SuperApiPropertyOptions,
} from '../metadata/data-transfer-objects.interface';
import { isClass } from './is-class.utils';

export const addDtoProperties = (dto: new () => any) => {
    const properties =
        Reflect.getMetadata(
            DECORATORS.API_MODEL_PROPERTIES_ARRAY,
            dto.prototype,
        ) || [];

    const form: SuperApiPropertyOptions = {};
    for (const property of properties) {
        const [, propertyKey] = property.split(':');

        const propertyData = Reflect.getMetadata(
            DECORATORS.API_MODEL_PROPERTIES,
            dto.prototype,
            propertyKey,
        ) as SuperApiPropertyOptions;

        form[propertyKey] = {
            title: propertyData?.title || propertyKey,
            type: propertyData?.type?.['name'] || 'String',
            ...propertyData,
        };

        const type = propertyData?.type as new () => any;
        if (type && isClass(type)) {
            form[propertyKey].form = addDtoProperties(type);
            form[propertyKey].type = 'object';
        }
    }

    const dtoMetadata: DTOMetadata = {
        name: dto.name,
        form,
    };

    DTOMetadataStorage.addDTOMetadata(dtoMetadata);

    return dtoMetadata;
};
