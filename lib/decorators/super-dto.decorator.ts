import { addDtoProperties } from '../common/add-dto-properties.utils';

export function SuperDTO() {
    return function (target: new () => any) {
        addDtoProperties(target);
    };
}
