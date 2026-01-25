CREATE TABLE "cities" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"subject" varchar(255) NOT NULL,
	"population" integer DEFAULT 0 NOT NULL,
	"slug" varchar(255) NOT NULL,
	CONSTRAINT "cities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment" text,
	"rating" real DEFAULT 0 NOT NULL,
	"photo" text,
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"customer_id" integer NOT NULL,
	"vacancy_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"login" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"birthday" date,
	"phone" varchar(20),
	"description" text,
	"avatar" text,
	"specialisation" varchar(255),
	"password" varchar(255) NOT NULL,
	"rating" real DEFAULT 0 NOT NULL,
	"is_email_visible" boolean DEFAULT false NOT NULL,
	"is_phone_visible" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_login_unique" UNIQUE("login"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vacancies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"cover" text,
	"description" text,
	"price" real,
	"is_location_hidden" boolean DEFAULT false NOT NULL,
	"is_vacancy_hidden" boolean DEFAULT false NOT NULL,
	"rating" real DEFAULT 0 NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"status" varchar DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"category_id" integer,
	"city_name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "vacancy_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	CONSTRAINT "vacancy_categories_title_unique" UNIQUE("title"),
	CONSTRAINT "vacancy_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "vacancy_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"vacancy_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_vacancy_id_vacancies_id_fk" FOREIGN KEY ("vacancy_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_category_id_vacancy_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."vacancy_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_city_name_cities_name_fk" FOREIGN KEY ("city_name") REFERENCES "public"."cities"("name") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancy_photos" ADD CONSTRAINT "vacancy_photos_vacancy_id_vacancies_id_fk" FOREIGN KEY ("vacancy_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;