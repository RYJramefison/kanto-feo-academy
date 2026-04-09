# Kanto-FEO Backend

Backend API pour l'application Kanto-FEO développée avec NestJS.

## Technologies utilisées

### Framework principal

- **NestJS** v11.0.1 - Framework Node.js TypeScript
- **TypeScript** v5.7.3 - Superset JavaScript avec typage statique

### Base de données

- **Prisma** v5.6.0 - ORM et toolkit de base de données
- **Prisma Client** v5.6.0 - Client de base de données généré
- **Prisma Adapter PostgreSQL** v7.7.0 - Adaptateur PostgreSQL

### Authentification & Sécurité

- **@nestjs/jwt** v11.0.2 - Gestion des tokens JWT
- **@nestjs/passport** v11.0.5 - Stratégies d'authentification
- **passport** v0.7.0 - Middleware d'authentification
- **passport-jwt** v4.0.1 - Stratégie JWT pour Passport
- **bcrypt** v6.0.0 - Hashage de mots de passe

### API & Documentation

- **@nestjs/swagger** v11.2.6 - Documentation API automatique
- **class-validator** v0.15.1 - Validation des DTOs
- **class-transformer** v0.5.1 - Transformation des données

### WebSocket

- **@nestjs/platform-socket.io** v11.1.17 - Support WebSocket
- **@nestjs/websockets** v11.1.17 - Module WebSockets

### Utilitaires

- **nodemailer** v8.0.3 - Envoi d'emails
- **js-yaml** v4.1.1 - Parseur YAML
- **rxjs** v7.8.1 - Programmation réactive

## Spécification API

La spécification complète de l'API se trouve dans le fichier :
**`api-specification.yaml`**

Ce fichier contient la documentation OpenAPI/Swagger de tous les endpoints, modèles de données et schémas de l'API.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
