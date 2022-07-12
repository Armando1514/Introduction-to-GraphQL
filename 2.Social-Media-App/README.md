# SOCIAL MEDIA APP

Very simple social media application, you can go to the homepage and see other people posts.

## How to run it

0. root directory and cd server
1. npm install
2. Change the file .env with your postgres credentials
3. npx prisma db push
4. Check the prisma has correctly created the tables with the command: npx prisma studio
5. npm run start:dev
6. root directory and cd client
7. npm install
8. yarn start
9. 
The client is suppose to be for test purpose, so: 
- go to http://localhost:3000/signup to signup
- go to http://localhost:3000/signin to signin
- go to http://localhost:3000/posts to see all the posts
- go to http://localhost:3000/profile/${ID_TO_BE_SET} to see posts related to one user


## Tech stack:

- Postgres
- Prisma
- Apollo Server
- Apollo Client
- DataLoader
- Typescript
- GraphQL

