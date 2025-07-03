import { AddFormField, AddFormFieldProps } from "@/components/AddFormField";
import FormInput, { FormError } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { editTemplateAction } from "@/actions/editTemplateAction";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

export function TemplateEditDialog({
  open,
  setOpen,
  template,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  template: any;
}) {
  const [state, action, loading] = useActionState(
    editTemplateAction as any,
    {
      success: false,
      errors: null,
    } as any
  );

  const [formFields, setFormFields] = useState<AddFormFieldProps[]>([]);
  const [isPublic, setIsPublic] = useState(template.public || false);

  const formRef = useRef<HTMLFormElement>(null);

  const getError = (field: string) => {
    return state?.errors?.[field]?._errors?.[0] || null;
  };

  useEffect(() => {
    if (template.forms) {
      setFormFields(template?.forms || []);
    }
    setIsPublic(template.public || false);
  }, [template]);

  useEffect(() => {
    if (state.success === true) {
      setOpen(false);
      toast.success("Template updated successfully");
    } else if (state.error && state.error !== null) {
      toast.error("Failed to delete template");
      setOpen(false);
    }
  }, [state, setOpen]);

  if (typeof window === "undefined") return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        side="right"
        className="w-full max-w-[500px]"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Edit Template
          </SheetTitle>
        </SheetHeader>

        <div className=" flex flex-col flex-1 gap-4 px-5 max-xs:p-4  w-full  overflow-y-auto">
          <form ref={formRef} action={action} className="flex flex-col gap-4">
            <div>
              <FormInput
                required
                label="Template Title"
                type="input"
                placeholder="Enter your template name"
                name="title"
                defaultValue={template?.title}
              />
              <FormError error={getError("title")} />
            </div>
            <div>
              <FormInput
                required
                label="Template Description"
                type="textarea"
                rows={2}
                placeholder="Enter your template description"
                name="description"
                defaultValue={template?.description}
              />
              <FormError error={getError("description")} />
            </div>
            <div>
              <FormInput
                type="file"
                accept="image/*"
                label="Template Icon (Leave empty for no changes)"
                placeholder="Enter your template icon "
                name="icon"
              />
              <FormError error={getError("icon")} />
            </div>
            <div>
              <FormInput
                required
                rows={5}
                label="AI Prompt "
                type="textarea"
                placeholder="Enter your template ai prompt"
                name="prompt"
                defaultValue={template?.prompt}
              />
              <FormError error={getError("prompt")} />
            </div>
            <div className="flex flex-col gap-2">
              {formFields.map((field, index) => (
                <AddFormField
                  key={index}
                  data={field}
                  index={index}
                  setFormFields={setFormFields}
                  state={state}
                />
              ))}
              <input
                type="hidden"
                name="forms"
                value={JSON.stringify(formFields)}
              />
              <Button
                onClick={() =>
                  setFormFields([
                    ...formFields,
                    {
                      label: "",
                      placeholder: "",
                      type: "input",
                      title: "",
                      rowspan: 1,
                      required: false,
                    },
                  ])
                }
                type="button"
                variant="outline"
                className="w-full my-3"
              >
                <Plus /> Add Form Field
              </Button>
            </div>
            <input type="hidden" name="templateId" value={template.id} />
            <input
              type="hidden"
              name="public"
              value={isPublic ? "true" : "false"}
            />
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Make this template public
              </p>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
          </form>
        </div>
        <SheetFooter className="flex justify-end flex-row">
          <Button
            disabled={loading}
            className="text-gray-100 flex items-center gap-1"
            type="submit"
            onClick={async () => {
              await formRef.current?.requestSubmit();
            }}
          >
            <Spinner
              className={`size-4 text-white flex-shrink-0 ${
                !loading ? "hidden" : ""
              }`}
            />
            <span className="text-md">
              {loading ? "Saving changes" : "Save changes"}
            </span>
          </Button>
          <SheetClose asChild>
            <Button variant="outline" className="bg-background">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default TemplateEditDialog;
