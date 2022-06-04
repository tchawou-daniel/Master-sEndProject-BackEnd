"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transform_repository_1 = require("./transform.repository");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const cors = {
        origin: ['http://localhost:3000'],
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        allowedHeaders: [
            'Accept',
            'Content-Type',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Headers',
        ],
    };
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Empreintt Solution')
        .setDescription('Empreintt is a company contracted to hire and staff employees for other companies')
        .setVersion('0.0')
        .addTag('empreintt')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors(cors);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new transform_repository_1.TransformInterceptor());
    const port = process.env.PORT;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map