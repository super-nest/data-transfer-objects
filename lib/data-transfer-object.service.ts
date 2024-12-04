import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { DTOMetadataStorage } from './storages/data-transfer-objects.storage';

@Injectable()
export class DataTransferObjectService {
    private readonly dTOMetadataStorage = DTOMetadataStorage;

    findOne(name: string) {
        return this.dTOMetadataStorage.getDTOMetadata(name);
    }

    find() {
        return this.dTOMetadataStorage.getAllDTOMetadata();
    }
}
