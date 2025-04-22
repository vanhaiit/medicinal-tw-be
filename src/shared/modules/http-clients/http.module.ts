import { Global, Module } from '@nestjs/common';

import { HttpClient } from './https.client';

@Global()
@Module({
    providers: [HttpClient],
    exports: [HttpClient],
})
export class HttpClientModule {}
