import { CONTENT_HISTORY_PAGINATION_LIMIT } from "@/constants";
import { db } from "@/db";
import { contentHistorySchema } from "@/db/schemas";
import { desc, eq } from "drizzle-orm";

export const addContentHistory = async (
  userId: string,
  templateId: string,
  content: string
) => {
  try {
    const data = await db
      .insert(contentHistorySchema)
      .values({
        userID: userId,
        template_id: templateId,
        content: content,
      })
      .returning();
    return data[0];
  } catch {
    return null;
  }
};

export interface UserContentHistoryType {
  content: string;
  template_id: string;
  created_at: Date;
  template: {
    title: string;
    icon: string;
  };
}

export const getUserContentHistory = async (
  userId: string,
  {
    limit = CONTENT_HISTORY_PAGINATION_LIMIT,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  } = {}
): Promise<UserContentHistoryType[]> => {
  try {
    const data = await db.query.contentHistorySchema.findMany({
      where: eq(contentHistorySchema.userID, userId),
      columns: {
        content: true,
        template_id: true,
        created_at: true,
      },
      with: {
        template: {
          columns: {
            title: true,
            icon: true,
          },
        },
      },
      orderBy: desc(contentHistorySchema.created_at),
      limit,
      offset,
    });
    return data;
  } catch {
    return [];
  }
};

export const clearTemplateContentHistory = async (templateId: string) => {
  try {
    await db
      .delete(contentHistorySchema)
      .where(eq(contentHistorySchema.template_id, templateId));
    return true;
  } catch {
    return false;
  }
};
