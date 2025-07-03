"use client";
import { createTemplateAction } from "@/actions";
import FormInput, { FormError } from "@/components/FormInput";
import { Button } from "@/components/ui/button";

import { AddFormField, AddFormFieldProps } from "@/components/AddFormField";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useActionState, useState } from "react";

const CreateTemplatePage = () => {
  const [formFields, setFormFields] = useState<AddFormFieldProps[]>([]);
  const [state, action, loading] = useActionState(
    createTemplateAction as any,
    { errors: null, success: false } as any
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const getError = (field: string) => {
    return state.errors && state.errors?.[field]?._errors?.[0];
  };

  return (
    <div className=" p-4 -7xl mx-auto">
      <div className="shadow-lg rounded-lg gap-4 p-5 max-xs:p-4 bg-card   max-w-[500px]  mx-auto">
        <h1 className="text-3xl font-semibold w-full border-b-2 py-4 text-center text-gray-700 dark:text-gray-200">
          Create Template
        </h1>
        <div className="flex items-center gap-2 py-3 justify-self-end">
          <p className="text-md text-gray-600 dark:text-gray-400">Public</p>
          <Switch
            name="public"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </div>
        <form action={action} className="flex flex-col   gap-4">
          <div>
            <FormInput
              required
              label="Template Title"
              type="input"
              placeholder="Enter your template name"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormError error={getError("description")} />
          </div>
          <div>
            <FormInput
              type="file"
              accept="image/*"
              label="Template Icon"
              placeholder="Enter your template icon"
              name="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
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
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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
            <input
              type="hidden"
              name="pu oblic"
              value={isPublic ? "true" : "false"}
            />
            {/* <div className="flex items-center gap">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visibility
              </p>
              <Switch
                name="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div> */}
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button
              disabled={loading}
              className="text-gray-100 flex items-center gap-1"
              type="submit"
            >
              <Spinner
                className={`size-4 text-white flex-shrink-0 ${
                  !loading ? "hidden" : ""
                }`}
              />
              <span className="text-md">
                {loading ? "Creating Template" : "Create Template"}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplatePage;
