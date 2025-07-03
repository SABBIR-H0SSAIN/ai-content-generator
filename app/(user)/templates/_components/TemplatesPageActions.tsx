"use client";
import MyTemplatesPreviewCard from "@/components/MyTemplatesPreviewCard";
import { useState } from "react";

import { Toaster } from "@/components/ui/sonner";
import TemplateDeleteDialog from "./TemplateDeleteDialog";
import TemplateEditDialog from "./TemplateEditDialog";

const TemplatesPageActions = ({ templates }: { templates: any[] }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>({
    id: "",
    title: "",
    description: "",
    prompt: "",
    icon: "",
    icon_id: "",
    forms: [],
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <TemplateDeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        templateId={selectedTemplate.id}
      />

      <TemplateEditDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        template={selectedTemplate}
      />

      <Toaster position="top-center" />
      <div className=" flex justify-center">
        <div className=" grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 px-5 lg:px-10 max-xs:px-3 max-xs:gap-3 gap-5 ">
          {templates.map((template, index) => (
            <MyTemplatesPreviewCard
              key={index}
              data={template}
              onDeleteButtonPress={() => {
                setSelectedTemplate(templates[index]);
                setOpenDeleteDialog(true);
              }}
              onEditButtonPress={() => {
                setSelectedTemplate(templates[index]);
                setOpenEditDialog(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPageActions;
