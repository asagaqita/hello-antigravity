import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const subscriptions = sqliteTable('subscriptions', {
    id: integer('id').primaryKey(),
    userId: text('user_id').notNull(),
    name: text('name').notNull(),
    price: integer('price').notNull(),
    isYearly: integer('is_yearly', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
