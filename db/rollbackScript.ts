import { deleteAllIcons } from "@/lib/cloudinary";
import * as fs from "fs";
import * as path from "path";
import { rimraf } from "rimraf";
import { db, pool } from "./index";
import { CUSTOM_TYPES, TABLE_NAMES } from "./schemas";

async function rollbackDatabase() {
  try {
    console.log("♻️ Starting database rollback...");

    console.log("\n🗑️  Dropping tables...");
    for (const tableName of TABLE_NAMES) {
      await db.execute(`DROP TABLE IF EXISTS ${tableName} CASCADE;`);
      console.log(`✔️ Dropped table: ${tableName}`);
    }

    console.log("\n🗑️  Dropping custom types...");
    for (const type of CUSTOM_TYPES) {
      await db.execute(`DROP TYPE IF EXISTS ${type} CASCADE;`);
      console.log(`✔️ Dropped type: ${type}`);
    }

    console.log("\n✅ Database rollback completed successfully!");
  } catch (error) {
    console.error("❌ Error during database rollback:", error);
    throw error;
  }
}

async function deleteMigrationFiles() {
  try {
    console.log("\n🗂️  Cleaning up migration files...");

    const migrationsDir = path.join(__dirname, "migrations");

    if (!fs.existsSync(migrationsDir)) {
      console.log("📁 Migrations directory doesn't exist, skipping.. cleanup");
      return;
    }

    await rimraf(migrationsDir);

    console.log("\n✅ Migration files cleanup completed!");
  } catch (error) {
    console.error("\n❌ Error during migration files cleanup:", error);
    throw error;
  }
}

async function clearIconsFolder() {
  console.log("\n🕑 Clearing icons folder...");
  const result = await deleteAllIcons();
  console.log("✅ Icons folder cleared!");
}
async function main() {
  try {
    await rollbackDatabase();
    await deleteMigrationFiles();
    await clearIconsFolder();

    console.log("\n🎉 Complete rollback finished successfully!");
    console.log(
      "\n💡 You can now run 'npm run db:all' to perform full migration and seeding process"
    );
  } catch (error) {
    console.error("❌ Rollback failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
