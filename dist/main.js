"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transform_repository_1 = require("./transform.repository");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new transform_repository_1.TransformInterceptor());
    const port = process.env.PORT;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map