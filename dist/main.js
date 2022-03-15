"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const transform_repository_1 = require("./transform.repository");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new transform_repository_1.TransformInterceptor());
    const port = process.env.;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map