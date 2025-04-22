// Import necessary modules and dependencies
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { connectRedisAdapter } from 'adapters/redis.adapter';
import { AppModule } from 'app.module';
import helmet from 'helmet';
import { initSwagger } from 'swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';

// Main application bootstrap function
async function bootstrap() {
    // Initialize TypeORM transactional context for database transactions
    initializeTransactionalContext();

    // Create NestJS application instance with Express platform
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

    // Enable CORS for cross-origin requests
    app.enableCors();

    // Set global API prefix from config or default to 'api'
    app.setGlobalPrefix(configService.get<string>('GLOBAL_PREFIX') || 'api');

    // Redis adapter connection (currently commented out)
    // await connectRedisAdapter(app);

    // Initialize Swagger documentation if SWAGGER_PATH is configured
    if (configService.get<string>('SWAGGER_PATH')) {
        initSwagger(app, configService.get<string>('SWAGGER_PATH'));
    }

    // Add security headers using helmet middleware
    app.use(helmet());

    // Start the application on configured port or default to 3000
    await app.listen(configService.get<number>('PORT') || 3000);
}

// Start the application
bootstrap();
