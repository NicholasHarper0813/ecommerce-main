import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class Cloudinary 
{
  constructor() 
  {
    v2.config({
      cloud_name: 'dujj0wros',
      api_key: '921715816373792',
      api_secret: 'ZfLBatZYggLU0mal6iFAINs484Y',
    });
  }
}
