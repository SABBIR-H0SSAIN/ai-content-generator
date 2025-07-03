import { db, pool } from "@/db";
import { randomId } from "@/lib/utils";
import { templateSchema } from "../schemas";
import { templateSeederData } from "./data";

const modifiedTemplateSeederData = [...templateSeederData].map((template) => ({
  ...template,
  userID: "user_2yp2ffsR2dr0bkvQsrtOdpW4nYe",
  public: true,
  forms: JSON.stringify(
    template.forms.map((form: any) => ({ ...form, id: randomId(10) }))
  ),
}));

(async () => {
  try {
    const templates = await db.select().from(templateSchema);
    if (templates.length > 0) {
      console.log("ℹ️ Database already seeded");
    } else {
      console.log("🔄 Seeding database...");
      await db.insert(templateSchema).values(modifiedTemplateSeederData);
    }

    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
