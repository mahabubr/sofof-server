# Sofof Backend

A backend server built with **NestJS**, **MySQL**, and **Prisma ORM**.

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- MySQL (v8+ recommended)

## Clone the Repository

```bash
git clone https://github.com/mahabubr/sofof-server
cd nestjs-server
```

## Install Dependencies

```bash
npm install
```


## Environment Variables
Create a .env file in the root directory and configure the following:

```bash
mode="development"
PORT="8000"
SALT_ROUND="10"
JWT_SECRET="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTc2ODI1MDMxNSwiaWF0IjoxNzY4MjUwMzE1fQ.4cbjbrjHAk-AKc4GEzGx72N9OkUkQja3G8rFg9tAIrQ"

DATABASE_URL="mysql://root:MySQL80@localhost:3306/sofof"

DATABASE_USER="root"
DATABASE_PASSWORD="MySQL80"
DATABASE_NAME="sofof"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

Update values according to your local setup.


## Prisma Setup
Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

(Optional) Open Prisma Studio:

```bash
npx prisma studio
```

## Run the Server ( Development )

```bash
npm run start:dev
```

## Run the Server ( Production )

```bash
npm run build
npm run start:prod
```

The server will start at:

```bash
http://localhost:8000
```