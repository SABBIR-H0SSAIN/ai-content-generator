import { db } from "@/db";
import { templateSchema } from "@/db/schemas";
import { and, desc, eq, ilike, sql, SQL } from "drizzle-orm";

export const getUserTemplates = async (
  userId: string,
  {
    limit,
    query,
    offset = 0,
  }: {
    limit?: number;
    query?: string;
    offset?: number;
  } = {}
) => {
  try {
    const whereOptions: SQL[] = [eq(templateSchema.userID, userId)];
    if (query && query.trim() != "") {
      whereOptions.push(ilike(templateSchema.title, `%${query.trim()}%`));
    }
    const templates = await db.query.templateSchema.findMany({
      columns: {
        id: true,
        title: true,
        description: true,
        icon: true,
        forms: true,
        prompt: true,
        public: true,
      },
      where: and(...whereOptions),
      limit,
      offset,
      orderBy: [desc(templateSchema.updated_at)],
    });
    return templates;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPublicTemplates = async ({
  query,
  limit,
  offset = 0,
}: {
  query?: string;
  limit?: number;
  offset?: number;
} = {}) => {
  try {
    const whereOptions: SQL[] = [eq(templateSchema.public, true)];

    if (query && query.trim() != "") {
      whereOptions.push(ilike(templateSchema.title, `%${query.trim()}%`));
    }

    const templates = await db.query.templateSchema.findMany({
      columns: {
        id: true,
        title: true,
        description: true,
        icon: true,
      },
      where: and(...whereOptions),
      limit,
      offset,
      orderBy: [
        desc(templateSchema.popularity),
        desc(templateSchema.created_at),
      ],
    });

    return templates;
  } catch {
    return [];
  }
};

export const getTemplateById = async (id: string, userId?: string) => {
  try {
    const template = await db.query.templateSchema.findFirst({
      where: userId
        ? and(eq(templateSchema.id, id), eq(templateSchema.userID, userId))
        : eq(templateSchema.id, id),
    });
    if (!template) {
      return null;
    }
    return template;
  } catch {
    return null;
  }
};

export const createNewTemplate = async (
  template: typeof templateSchema.$inferInsert
) => {
  try {
    const newTemplate = await db.insert(templateSchema).values(template);
    return newTemplate;
  } catch {
    return null;
  }
};

export const createNewTemplateByUser = async (
  userId: string,
  template: typeof templateSchema.$inferInsert
) => {
  try {
    const newTemplate = await db.insert(templateSchema).values({
      ...template,
      userID: userId,

      updated_at: new Date(),
    });
    return newTemplate;
  } catch {
    return null;
  }
};

export const deleteTemplate = async (userId: string, templateId: string) => {
  try {
    const deleted = await db
      .delete(templateSchema)
      .where(
        and(
          eq(templateSchema.userID, userId),
          eq(templateSchema.id, templateId)
        )
      );
    return deleted.rowCount == 1;
  } catch {
    return false;
  }
};

interface UpdateTemplateData {
  title?: string;
  description?: string;
  icon?: string;
  prompt?: string;
  forms?: unknown;
  public?: boolean;
}

export const updateTemplate = async (
  templateId: string,
  userId: string,
  data: UpdateTemplateData
) => {
  try {
    const updatedTemplate = await db
      .update(templateSchema)
      .set({
        ...data,
        updated_at: new Date(),
      })
      .where(
        and(
          eq(templateSchema.id, templateId),
          eq(templateSchema.userID, userId)
        )
      )
      .returning();
    return updatedTemplate;
  } catch {
    return null;
  }
};

export const addTemplatePopularity = async (
  templateId: string,
  amount: number = 1
) => {
  try {
    const updatedTemplate = await db
      .update(templateSchema)
      .set({
        popularity: sql`${templateSchema.popularity} + ${amount}`,
      })
      .where(eq(templateSchema.id, templateId))
      .returning();
    return updatedTemplate;
  } catch {
    return null;
  }
};
