import { config } from "dotenv"
config({ path: ".env" })

import { db } from "@/lib/db"
import { user, account } from "./schema"
import { eq } from "drizzle-orm"
import { hashPassword } from "better-auth/crypto"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@animepol.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "animepol2026"
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin"

async function seed() {
  console.log("Creating admin user...")

  const hashed = await hashPassword(ADMIN_PASSWORD)

  const userId = crypto.randomUUID()

  const [existing] = await db
    .select()
    .from(user)
    .where(eq(user.email, ADMIN_EMAIL))

  if (existing) {
    console.log(`Admin "${ADMIN_EMAIL}" already exists. Updating password...`)
    await db
      .delete(account)
      .where(eq(account.userId, existing.id))
    await db
      .insert(account)
      .values({
        id: crypto.randomUUID(),
        accountId: ADMIN_EMAIL,
        providerId: "credential",
        userId: existing.id,
        password: hashed,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    console.log("Admin password updated.")
  } else {
    await db.insert(user).values({
      id: userId,
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await db.insert(account).values({
      id: crypto.randomUUID(),
      accountId: ADMIN_EMAIL,
      providerId: "credential",
      userId: userId,
      password: hashed,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log(`Admin created: ${ADMIN_EMAIL}`)
  }

  console.log("Done.")
  process.exit(0)
}

seed().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
