import { DynamicModule, Module } from '@nestjs/common';
import { DataTransferObjectService } from './data-transfer-object.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DataTransferObjectService],
    exports: [DataTransferObjectService],
})
export class DataTransferObjectModule {
    static forRoot(): DynamicModule {
        return {
            module: DataTransferObjectModule,
            imports: [],
            providers: [DataTransferObjectService],
            exports: [DataTransferObjectService],
        };
    }
}
