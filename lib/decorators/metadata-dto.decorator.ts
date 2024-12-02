import { addDtoProperties } from '../common/add-dto-properties.utils';

export function MetadataDTO(dto: new () => any) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        addDtoProperties(dto);
    };
}
