## Data Transfer Objects for NestJS

### Introduction

Welcome to the `@super-nest/data-transfer-objects` package! This library
provides a robust way to manage Data Transfer Objects (DTOs) in your NestJS
applications. It simplifies the process of defining and using DTOs, ensuring
that your data structures are well-defined and easy to manage.

### Features

-   **Automatic Metadata Storage**: Automatically stores metadata for your DTOs.
-   **Easy Integration**: Seamlessly integrates with NestJS and its decorators.
-   **Type Safety**: Leverages TypeScript for type safety and better development
    experience.
-   **Customizable**: Easily extendable to fit your specific needs.

### Installation

To install the package, run the following command:

```bash
$ npm install @super-nest/data-transfer-objects
```

### Usage

**Step 1: Import the Module** Create your DTOs using the MetadataDTO decorator.
This decorator will automatically register the metadata for your DTO.

```bash
import { Module } from '@nestjs/common';
import { DataTransferObjectModule } from '@super-nest/data-transfer-objects';

@Module({
  imports: [
    DataTransferObjectModule.forRoot(),
  ],
})
export class AppModule {}
```

**Step 2: Define Your DTOs**

```bash
import { MetadataDTO } from '@super-nest/data-transfer-objects';

@MetadataDTO
export class CreateUserDto {
  name: string;
  email: string;
}
```

**Step 3: Use DTOs in Your Services**

```bash
import { Injectable } from '@nestjs/common';
import { DataTransferObjectService } from '@super-nest/data-transfer-objects';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dtoService: DataTransferObjectService) {}

  async createUser(createUserDto: CreateUserDto) {
    const dtoMetadata = await this.dtoService.findOne(CreateUserDto.name);
    // Use dtoMetadata as needed
  }
}
```

###Contact For any questions or issues, please reach out to the author:

-   Hoang Cong Nhut Vy
-   [GitHub Profile](https://github.com/vyhcn3012)
