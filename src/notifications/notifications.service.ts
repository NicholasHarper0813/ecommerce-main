import { HttpException, Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly dbService: DatabaseService) {}

  private userNotificationSubjects: Map<string, Subject<any>> = new Map();

  getUserNotifications(userId: string): Observable<any> {
    if (!this.userNotificationSubjects.has(userId)) {
      this.userNotificationSubjects.set(userId, new Subject<any>());
    }
    return this.userNotificationSubjects.get(userId).asObservable();
  }

  async sendNotificationToUser(
    userId: string,
    notification: { message: string },
  ) {
    try {
      await this.storeNotification(userId, notification.message);
      if (this.userNotificationSubjects.has(userId)) {
        this.userNotificationSubjects.get(userId).next(notification);
      }
      return {
        message: 'Notification sent',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  storeNotification(userId: string, message: string) {
    return this.dbService.notification.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        message,
      },
    });
  }

  async findAll(userId: string) {
    try {
      const notifications = await this.dbService.notification.findMany({
        where: {
          User: {
            id: userId,
          },
        },
      });
      return {
        data: notifications,
        message: 'Notifications found',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
