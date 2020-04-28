import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ALI_OSS_MODULE_OPTIONS } from './ali-oss.constants';
import { AliOssService } from './ali-oss.service';
import {
  AliOssModuleAsyncOptions,
  AliOssModuleOptions,
  AliOssModuleOptionsFactory
} from './interfaces/ali-oss-module-options.interface';

@Module({
  providers: [AliOssService],
  exports: [AliOssService]
})
export class AliOssModule {
  static register(options: AliOssModuleOptions): DynamicModule {
    return {
      module: AliOssModule,
      providers: [{ provide: ALI_OSS_MODULE_OPTIONS, useValue: options }]
    };
  }

  static registerAsync(options: AliOssModuleAsyncOptions): DynamicModule {
    return {
      module: AliOssModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: AliOssModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: AliOssModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: ALI_OSS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: ALI_OSS_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AliOssModuleOptionsFactory) =>
        await optionsFactory.createAliOssOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
