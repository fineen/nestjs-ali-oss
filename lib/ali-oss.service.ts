import * as OSS from 'ali-oss';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { ALI_OSS_MODULE_OPTIONS } from './ali-oss.constants';

@Injectable()
export class AliOssService extends OSS {
  constructor(
    @Optional() @Inject(ALI_OSS_MODULE_OPTIONS) options: OSS.Options
  ) {
    super(options);
  }
}
