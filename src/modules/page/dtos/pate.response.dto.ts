import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatePageResponseDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty({
        required: false,
        example: 'This is a sample product description.',
    })
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    template: string;

    @ApiProperty()
    @Expose()
    generator: string;

    @ApiProperty()
    @Expose()
    applicationName: string;

    @ApiProperty()
    @Expose()
    referrer: string;

    @ApiProperty()
    @Expose()
    keywords: string;

    @ApiProperty()
    @Expose()
    authors: string;

    @ApiProperty()
    @Expose()
    creator: string;

    @ApiProperty()
    @Expose()
    publisher: string;

    @ApiProperty()
    @Expose()
    formatDetection: string;

    @ApiProperty()
    @Expose()
    index: number;

    @ApiProperty()
    @Expose()
    info: any;

    @ApiProperty()
    @Expose()
    detail: any;
}

export class GetPageResponseDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty({
        required: false,
        example: 'This is a sample product description.',
    })
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    template: string;

    @ApiProperty()
    @Expose()
    generator: string;

    @ApiProperty()
    @Expose()
    applicationName: string;

    @ApiProperty()
    @Expose()
    referrer: string;
    keywords: string;

    @ApiProperty()
    @Expose()
    authors: string;

    @ApiProperty()
    @Expose()
    creator: string;

    @ApiProperty()
    @Expose()
    publisher: string;

    @ApiProperty()
    @Expose()
    formatDetection: string;

    @ApiProperty()
    @Expose()
    status: number;

    @ApiProperty()
    @Expose()
    index: number;

    @ApiProperty()
    @Expose()
    createdAt: string;

    @ApiProperty()
    @Expose()
    updatedAt: string;

    @ApiProperty()
    @Expose()
    deletedAt: string;

    @ApiProperty()
    @Expose()
    detail: any;

    @ApiProperty()
    @Expose()
    image: string;
}
