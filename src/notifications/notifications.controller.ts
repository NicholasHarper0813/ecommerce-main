import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { map, Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { Roles } from 'src/roles/roles.decorator';
import { ROLES } from 'src/utils/constants';
import { RolesGuard } from 'src/roles/roles.guard';
import {
  Controller,
  Post,
  Body,
  Sse,
  MessageEvent,
  Param,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Sse('events/:userId')
  sendEvents(@Param('userId') userId: string): Observable<MessageEvent> {
    return this.notificationsService.getUserNotifications(userId).pipe(
      map((notification) => ({
        data: notification,
      })),
    );
  }

  @Post(':userId')
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  create(
    @Param('userId') userId: string,
    @Body() createNotificationDto: CreateNotificationDto,
  ) 
  {
    return this.notificationsService.sendNotificationToUser(
      userId,
      createNotificationDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) 
  {
    const { sub } = req.user;
    return this.notificationsService.findAll(sub);
  }
}
