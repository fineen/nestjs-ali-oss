import { Options } from 'ali-oss';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type AliOssModuleOptions = Options;

export interface AliOssModuleOptionsFactory {
  createAliOssOptions(): Promise<AliOssModuleOptions> | AliOssModuleOptions;
}

export interface AliOssModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AliOssModuleOptionsFactory>;
  useClass?: Type<AliOssModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AliOssModuleOptions> | AliOssModuleOptions;
  inject?: any[];
}
