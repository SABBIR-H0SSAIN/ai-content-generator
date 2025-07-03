import { getTemplateById } from "@/lib/db/templates";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ManageContentForm from "./_components/ManageContentForm";

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const template = await getTemplateById(id);

  if (!template) {
    return {
      title: "EasyAi | Template Not Found",
    };
  }

  return {
    title: `EasyAi | ${template.title}`,
    description: template.description,
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const templateData = await getTemplateById(id);

  if (!templateData) {
    return notFound();
  }
  const template = {
    id: templateData.id as string,
    title: templateData.title as string,
    description: templateData.description as string,
    icon: templateData.icon as string,
    forms: templateData.forms,
  };

  return (
    <div className="px-2 xs:px-4 py-5 lg:py-10 flex flex-col justify-center xl:flex-row gap-4  w-full max-w-7xl mx-auto">
      <ManageContentForm template={template} templateId={id} />
    </div>
  );
};

export default page;
