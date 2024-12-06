import { OrderStatus } from '@prisma/client';
import { IsIn } from 'class-validator';

export class UpdateOrderDto {
  @IsIn([
    OrderStatus.PENDING,
    OrderStatus.PLACED,
    OrderStatus.DISPATCHED,
    OrderStatus.CANCELLED,
    OrderStatus.DELIVERED,
  ])
  status: OrderStatus;
}
