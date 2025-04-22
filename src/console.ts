import { AppConsoleModule } from 'app-console.module';
import { BootstrapConsole } from 'nestjs-console';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { sleep } from '@shared/utils/util';

const bootstrap = new BootstrapConsole({
    module: AppConsoleModule,
    useDecorators: true,
});
bootstrap.init().then(async app => {
    try {
        initializeTransactionalContext();
        await app.init();
        await bootstrap.boot();
        console.log('console init');
        await app.close();
    } catch (e) {
        console.log('error');
        await sleep(5000);
        console.error(e);
        await app.close();
        process.exit(1);
    }
});
