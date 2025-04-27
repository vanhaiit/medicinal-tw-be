// import { SocketModule } from '@modules/socket/socket.module';
import { AttributeValueModule } from './attribute-value/attribute-value.module';
import { AttributeModule } from './attribute/attribute.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { FinderModule } from './finder/finder.module';
import { ItemModule } from './item/item.module';
import { OrdersModule } from './orders/orders.module';
import { PageModule } from './page/page.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './users/user.module';
import { VoucherModule } from './voucher/voucher.module';

export const MODULES = [
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    AttributeModule,
    AttributeValueModule,
    OrdersModule,
    ItemModule,
    FinderModule,
    UploadModule,
    PageModule,
    VoucherModule
];
