import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    login: text("login"),
    password: text("password"),
});

export const galaxias=sqliteTable ("galaxias",{
  id: integer("id").primaryKey(),
  nombre: text("nombre"),
  num_planetas:integer("num_planetas"),
  curiosidades: text("curiosidades"),
  tipo: text("tipo"),

})

export const planetas=sqliteTable ("planetas",{
  id: integer("id").primaryKey(),
  nombre: text("name"),
  anillos:integer("anillos"),
  satelites: integer("anillos"),
  habitabilidad: text("habitabilidad"),
  orbita_dias: integer("orbita_dias"),
  galaxia_id: integer("galaxia_id").references(()=>galaxias.id),
  count_planetas:integer()

})

export const planetas_users =sqliteTable ("planetas_users",{
      id: integer("id").primaryKey(),
      id_user: integer ("user_id").references(()=>users.id),
      id_galaxias: integer ("id_galaxias").references(()=>galaxias.id),
})
