### Overview

This is the backend for REST APIs of an ecommerce application built with Nest.js. This app includes REST APIs basic ecommerce features. The featuers are written below.

### Features

This app has following features/modules.

- Manage categories
- Manage sub-categories
- Manage Products
- Reviews/Ratings on products from customers
- Manage products wishlist
- Manage user profile
- Manage user cart
- Place orders
- Notifications
- User management (Admin | User)

### Major Dependencies

- Nest.js
- Prisma
- PostgreSQL

### How to Setup

1.  First you'll need to install postgreSQL in your local system to setup database.
2.  Install dependecies

    ```plaintext
    npm install
    ```

3.  Delete `migrations` folder from `prisma/` for a fresh start. (Optional)
4.  Migrate database using prisma. It will prompt you for migration name. You can name it anything. e.g. `initial_migration`

    ```plaintext
    npx prisma migrate dev
    ```

5.  Run the app

    ```plaintext
    npm run start:dev
    ```

6.  Your app will start running on PORT 3000.

### How to setup APIs

Please refer to the provided postman collection in the root folder

### Notification Handling

This project using built-in Server-sent-event system to send server to client events. Use javascript's `EventSource` API to connect with `{{base_url}}/notifications/{{userId}}`. You can find this API in notification folder in postman. The EventSource will return an object with message property containing the notification text.

### Contributions

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.
