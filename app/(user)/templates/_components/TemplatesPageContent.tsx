import Pagination from "@/components/Pagination";
import { TEMPLATE_PAGINATION_LIMIT } from "@/constants";
import { getUserTemplates } from "@/lib/db";
import TemplatesPageActions from "../_components/TemplatesPageActions";

const TemplatesPageContent = async ({
  params,
  userId,
}: {
  params: Promise<{
    page?: string;
    query?: string;
  }>;
  userId: string;
}) => {
  const { page, query = "" } = await params;

  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * TEMPLATE_PAGINATION_LIMIT;

  const templates = await getUserTemplates(userId, {
    query,
    limit: TEMPLATE_PAGINATION_LIMIT,
    offset,
  });
  return (
    <div>
      <TemplatesPageActions templates={templates} />
      <div className="flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          count={templates.length}
          limit={TEMPLATE_PAGINATION_LIMIT}
          className="my-8"
        />
      </div>
    </div>
  );
};

export default TemplatesPageContent;
