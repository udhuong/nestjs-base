Áp dụng middleware trong module:

```typescript
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users');
  }
}
```

Áp dụng toàn cục:
```typescript
app.use(new LoggerMiddleware().use);
```
