## Data Transfer Objects for NestJS

### Introduction

Welcome to the `@super-nest/data-transfer-objects` package! This library
provides an efficient and structured approach to managing Data Transfer Objects
(DTOs) in your NestJS applications. It enhances the process of defining,
organizing, and using DTOs, ensuring data consistency and improving
maintainability across your codebase.

### Features

-   **Automated Metadata Generation**: Automatically extracts and stores
    metadata for DTO properties to streamline API documentation and validation.
-   **Seamless Integration**: Works seamlessly with @nestjs/swagger for API and
    validation metadata.
-   **Nested Structures**: Handles nested DTO structures, allowing you to manage
    complex data hierarchies with ease.
-   **Custom Property Options**: Supports custom property definitions with
    enhanced options, including type definitions, titles, descriptions, and
    more.

### Installation

To install the package, run the following command:

```bash
$ npm install @super-nest/data-transfer-objects @nestjs/swagger
```

### Usage

**Step 1: Import the Module** Create your DTOs using the MetadataDTO decorator.
This decorator will automatically register the metadata for your DTO.

```ts
import { Module } from '@nestjs/common';
import { DataTransferObjectModule } from '@super-nest/data-transfer-objects';

@Module({
    imports: [DataTransferObjectModule.forRoot()],
})
export class AppModule {}
```

**Step 2: Define Your DTOs** Use can use `SuperApiProperty` to fit with
@super-nest or `ApiProperty` if you only get metadata.

```ts
import { MetadataDTO } from '@super-nest/data-transfer-objects';

@SuperDTO()
export class CreateUserDto {
    @SuperApiProperty({ type: String, description: 'User name' })
    //or @ApiProperty({ type: String, description: 'User name' })
    name: string;

    @SuperApiProperty({
        type: String,
        description: 'Email user',
        required: true,
    })
    // or @ApiProperty({ type: String, description: 'Email user', required: true })
    email: string;
}
```

**Step 3: Use DTOs in Your Services**

```ts
import { Injectable } from '@nestjs/common';
import { DataTransferObjectService } from '@super-nest/data-transfer-objects';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly dtoService: DataTransferObjectService) {}

    async createUser(createUserDto: CreateUserDto) {
        const dtoMetadata = await this.dtoService.findOne(CreateUserDto.name);
        // Use dtoMetadata as needed
        // {
        //     "name": "CreatePostDto",
        //     "form": {
        //         "name": {
        //             "title": "name",
        //             "type": "string",
        //             "description": "User name"
        //         },
        //         "email": {
        //             "title": "email",
        //             "type": "string",
        //             "description": "Email user",
        //             "required": true
        //         }
        //     }
        // }
    }
}
```

### Example: Using Nested DTOs with @SuperDTO

In scenarios where your DTO contains nested objects, you can define and use
nested DTOs seamlessly with `@SuperDTO`. Below is an example illustrating how to
handle nested structures like `SEOTagDto`. **Step 1: Import the Module**

```ts
import { SuperDTO } from '@super-nest/data-transfer-objects';
import { SuperApiProperty } from '@super-nest/data-transfer-objects/decorators';

@SuperDTO()
export class SEOTagDto {
    @SuperApiProperty({
        type: String,
        description: 'The title of the SEO tag',
        default: 'Default SEO Title',
    })
    title: string;

    @SuperApiProperty({
        type: String,
        description: 'The description of the SEO tag',
        default: 'Default SEO Description',
    })
    description: string;
}
```

**Step 2: Use the Nested DTO in a Parent DTO** The parent DTO (CreatePostDto)
includes the nested SEOTagDto as a property. The library will automatically
handle the nested structure and metadata.

```ts
import { SuperDTO } from '@super-nest/data-transfer-objects';
import { SuperApiProperty } from '@super-nest/data-transfer-objects/decorators';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional } from 'class-validator';
import { SEOTagDto } from './seo-tag.dto';

@SuperDTO()
export class CreatePostDto {
    @SuperApiProperty({
        type: String,
        description: 'The name of the post',
        default: 'Post Title',
    })
    name: string;

    @SuperApiProperty({
        type: SEOTagDto,
        description: 'SEO tag information for the post',
        title: 'SEO Tag',
        required: true,
        default: {
            title: 'Post SEO Title',
            description: 'Post SEO Description',
        },
    })
    @ValidateNested()
    @Type(() => SEOTagDto)
    seoTag: SEOTagDto;
}
```

**Step 3: Retrieve Metadata for the Nested DTO** Using the
DataTransferObjectService, you can retrieve the full metadata, including nested
structures.

```ts
import { Injectable } from '@nestjs/common';
import { DataTransferObjectService } from '@super-nest/data-transfer-objects';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostService {
    constructor(private readonly dtoService: DataTransferObjectService) {}

    async getPostDtoMetadata() {
        const dtoMetadata = await this.dtoService.findOne(CreatePostDto.name);
        console.log(dtoMetadata);
        // Metadata Output:
        // {
        //     "name": "CreatePostDto",
        //     "form": {
        //         "name": {
        //             "title": "name",
        //             "type": "string",
        //             "description": "The name of the post",
        //             "default": "Post Title"
        //         },
        //         "seoTag": {
        //             "title": "SEO Tag",
        //             "type": "object",
        //             "description": "SEO tag information for the post",
        //             "default": {
        //                 "title": "Post SEO Title",
        //                 "description": "Post SEO Description"
        //             },
        //             "form": {
        //                 "title": {
        //                     "title": "title",
        //                     "type": "string",
        //                     "description": "The title of the SEO tag",
        //                     "default": "Default SEO Title"
        //                 },
        //                 "description": {
        //                     "title": "description",
        //                     "type": "string",
        //                     "description": "The description of the SEO tag",
        //                     "default": "Default SEO Description"
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}
```

### Contact

For any questions or issues, please reach out to the author:

-   Hoang Cong Nhut Vy
-   [GitHub Profile](https://github.com/vyhcn3012)
-   [Linkedin](https://www.linkedin.com/in/vyhcn3012/)
