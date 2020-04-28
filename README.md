## Description

Aliyun OSS module for [Nest](https://github.com/nestjs/nest) based on the official [ali-oss](https://www.npmjs.com/package/ali-oss) package.

## Installation

```bash
$ npm i nestjs-ali-oss ali-oss --save
$ npm i @types/ali-oss --save-dev
# or
$ yarn add nestjs-ali-oss ali-oss
$ yarn add @types/ali-oss --dev

```

## Usage

Import `AliOssModule`:

```typescript
import { AliOssModule } from 'nestjs-ali-oss';

@Module({
  imports: [AliOssModule.register({
    region: '<oss region>',
    accessKeyId: '<Your accessKeyId>',
    accessKeySecret: '<Your accessKeySecret>',
    bucket: '<Your bucket name>'
  })],
  providers: [...],
})
export class AppModule {}
```

Inject `AliOssService`:

```typescript
import { AliOssService } from 'nestjs-ali-oss';

@Injectable()
export class AppService {
  constructor(private readonly aliOssService: AliOssService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
import { AliOssModule } from 'nestjs-ali-oss';

AliOssModule.registerAsync({
  useFactory: () => ({
    region: '<oss region>',
    accessKeyId: '<Your accessKeyId>',
    accessKeySecret: '<Your accessKeySecret>',
    bucket: '<Your bucket name>'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
AliOssModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    region: configService.getString('OSS_REGION'),
    accessKeyId: configService.getString('OSS_KEY'),
    accessKeySecret: configService.getString('OSS_SECRET'),
    bucket: configService.getString('OSS_BUCKET'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
AliOssModule.registerAsync({
  useClass: AliOssConfigService
});
```

Above construction will instantiate `AliOssConfigService` inside `AliOssModule` and will leverage it to create options object.

```typescript
import { AliOssModuleOptionsFactory, AliOssModuleOptions } from 'nestjs-ali-oss';

export class AliOssConfigService implements AliOssModuleOptionsFactory {
  createAliOssOptions(): AliOssModuleOptions {
    return {
      region: '<oss region>',
      accessKeyId: '<Your accessKeyId>',
      accessKeySecret: '<Your accessKeySecret>',
      bucket: '<Your bucket name>'
    };
  }
}
```

**3. Use existing**

```typescript
AliOssModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `AliOssModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `AliOssService` wraps the `Client` from the official [ali-oss](https://www.npmjs.com/package/ali-oss) methods. The `AliOssModule.register()` takes `options` object as an argument, [read more](https://www.npmjs.com/package/ali-oss#ossoptions).

## License

MIT
