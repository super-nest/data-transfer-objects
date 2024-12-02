import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { DTOMetadataStorage } from './storages/data-transfer-objects.storage';

@Injectable()
export class DataTransferObjectService {
    private readonly dTOMetadataStorage = DTOMetadataStorage;

    async findOne(name: string) {
        return this.dTOMetadataStorage.getDTOMetadata(name);
    }

    async find() {
        return this.dTOMetadataStorage.getAllDTOMetadata();
    }
}
