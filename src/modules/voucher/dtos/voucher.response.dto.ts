import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class VoucherResponseDto {
    @Expose()
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the voucher',
    })
    id: number;

    @Expose()
    @ApiProperty({
        example: 'SUMMER2024',
        description: 'Unique code for the voucher',
    })
    code: string;

    @Expose()
    @ApiProperty({
        example: 'percentage',
        description: 'Type of discount (e.g., percentage, fixed)',
    })
    discountType: string;

    @Expose()
    @ApiProperty({
        example: 15.0,
        description: 'Discount value, can be a percentage or fixed amount',
    })
    discountValue: number;

    @Expose()
    @ApiProperty({
        example: 15.0,
    })
    conditionApply: number;

    @Expose()
    @ApiProperty({
        example: true,
        description: 'Indicates if the voucher is active',
        required: true,
    })
    @Transform(({ value }) =>
        value === 'true' ? true : value === 'false' ? false : value,
    )
    isActive: boolean;

    @Expose()
    @ApiProperty({
        example: '1725352572',
        description: 'Expiration date of the voucher',
        required: false,
    })
    startAt: number | null;

    @Expose()
    @ApiProperty({
        example: '1725352572',
        description: 'Expiration date of the voucher',
        required: false,
    })
    expiresAt: number | null;

    @Expose()
    @ApiProperty()
    image: string | null;

    @Expose()
    @ApiProperty()
    imageMobile: string | null;

    @Expose()
    @ApiProperty({
        example: '2024-01-01T00:00:00Z',
        description: 'Timestamp when the voucher was created',
    })
    createdAt: Date;

    @Expose()
    @ApiProperty({
        example: '2024-01-01T00:00:00Z',
        description: 'Timestamp when the voucher was last updated',
    })
    updatedAt: Date;

    @Expose()
    @ApiProperty({
        example: null,
        description:
            'Timestamp when the voucher was deleted, or null if not deleted',
        required: false,
    })
    deletedAt: Date | null;
}
