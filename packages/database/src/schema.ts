import { relations, sql } from 'drizzle-orm'
import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  date,
  boolean,
  real,
  timestamp
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  login: varchar('login', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  birthday: date('birthday'),
  phone: varchar('phone', { length: 20 }),
  description: text('description'),
  avatar: text('avatar'),
  specialisation: varchar('specialisation', { length: 255 }),
  password: varchar('password', { length: 255 }).notNull(),
  rating: real('rating').notNull().default(0),
  isEmailVisible: boolean('is_email_visible').notNull().default(false),
  isPhoneVisible: boolean('is_phone_visible').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`)
})

export const cities = pgTable('cities', {
  name: varchar('name', { length: 255 }).primaryKey(),
  subject: varchar('subject', { length: 255 }).notNull(),
  population: integer('population').notNull().default(0),
  slug: varchar('slug', { length: 255 }).notNull().unique()
})

export const vacancyCategories = pgTable('vacancy_categories', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique()
})

export const VACANCY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted'
} as const
type VacancyStatus = typeof VACANCY_STATUS[keyof typeof VACANCY_STATUS];

export const vacancies = pgTable('vacancies', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  cover: text('cover'),
  description: text('description'),
  price: real('price'),
  isLocationHidden: boolean('is_location_hidden').notNull().default(false),
  isVacancyHidden: boolean('is_vacancy_hidden').notNull().default(false),
  rating: real('rating').notNull().default(0),
  viewCount: integer('view_count').notNull().default(0),
  status: varchar('status').notNull().default(VACANCY_STATUS.ACTIVE).$type<VacancyStatus>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').references(() => vacancyCategories.id, {
    onDelete: 'set null'
  }),
  cityName: varchar('city_name', { length: 255 }).references(() => cities.name, {
    onDelete: 'restrict'
  })
})

export const vacancyPhotos = pgTable('vacancy_photos', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  vacancyId: integer('vacancy_id')
    .notNull()
    .references(() => vacancies.id, { onDelete: 'cascade' })
})

export const feedbacks = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  comment: text('comment'),
  rating: real('rating').notNull().default(0),
  photo: text('photo'),
  isVisible: boolean('is_visible').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),

  customerId: integer('customer_id')
    .notNull()
    .references(() => users.id),
  vacancyId: integer('vacancy_id')
    .notNull()
    .references(() => vacancies.id, { onDelete: 'cascade' })
})

export const usersRelations = relations(users, ({ many }) => ({
  vacancies: many(vacancies),
  feedbacks: many(feedbacks)
}))

export const citiesRelations = relations(cities, ({ many }) => ({
  vacancies: many(vacancies)
}))

export const vacancyCategoriesRelations = relations(vacancyCategories, ({ many }) => ({
  vacancies: many(vacancies)
}))

export const vacanciesRelations = relations(vacancies, ({ one, many }) => ({
  user: one(users, {
    fields: [vacancies.userId],
    references: [users.id]
  }),
  category: one(vacancyCategories, {
    fields: [vacancies.categoryId],
    references: [vacancyCategories.id]
  }),
  city: one(cities, {
    fields: [vacancies.cityName],
    references: [cities.name]
  }),
  photos: many(vacancyPhotos),
  feedbacks: many(feedbacks)
}))

export const vacancyPhotosRelations = relations(vacancyPhotos, ({ one }) => ({
  vacancy: one(vacancies, {
    fields: [vacancyPhotos.vacancyId],
    references: [vacancies.id]
  })
}))

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  customer: one(users, {
    fields: [feedbacks.customerId],
    references: [users.id]
  }),
  vacancy: one(vacancies, {
    fields: [feedbacks.vacancyId],
    references: [vacancies.id]
  })
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type City = typeof cities.$inferSelect
export type NewCity = typeof cities.$inferInsert

export type Vacancy = typeof vacancies.$inferSelect
export type NewVacancy = typeof vacancies.$inferInsert

export type VacancyCategory = typeof vacancyCategories.$inferSelect
export type NewVacancyCategory = typeof vacancyCategories.$inferInsert

export type VacancyPhoto = typeof vacancyPhotos.$inferSelect
export type NewVacancyPhoto = typeof vacancyPhotos.$inferInsert

export type Feedback = typeof feedbacks.$inferSelect
export type NewFeedback = typeof feedbacks.$inferInsert
