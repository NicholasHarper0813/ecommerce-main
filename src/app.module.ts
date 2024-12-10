import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ProductsModule } from './products/products.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    CloudinaryModule,
    ImagesModule,
    NotificationsModule,
    CategoriesModule,
    SubcategoriesModule,
    ReviewsModule,
    OrdersModule,
    ProductsModule,
    AuthModule,
    CartModule,
    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
