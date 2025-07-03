"use client";
import FormInput, { FormError } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface AddFormFieldProps {
  label: string;
  placeholder?: string;
  type: string;
  title: string;
  required: boolean;
  context?: string;
  rowspan?: number;
}

export function AddFormField({
  data,
  index,
  setFormFields,
  state,
}: {
  data: AddFormFieldProps;
  index: number;
  setFormFields: React.Dispatch<React.SetStateAction<AddFormFieldProps[]>>;
  state: any;
}) {
  const getError = (field: string) => {
    return (
      state?.errors?.forms &&
      state.errors?.forms?.[index.toString()]?.[field]?._errors?.[0]
    );
  };

  return (
    <div className="flex flex-col gap-2  p-4 rounded-md border-2 ">
      <div className="flex flex-row gap-2">
        <div className="flex-1">
          <FormInput
            label="Label"
            type="input"
            value={data.label}
            placeholder="Enter your form field"
            className="w-full"
            required
            onChange={(e) =>
              setFormFields((old) =>
                old.map((field, i) =>
                  i === index ? { ...field, label: e.target.value } : field
                )
              )
            }
          />
          <FormError className="text-sm" error={getError("label")} />
        </div>
        <div className="flex-1">
          <FormInput
            className="w-full"
            label="Context"
            type="input"
            value={data?.context}
            placeholder="Enter context"
            required
            onChange={(e) =>
              setFormFields((old) =>
                old.map((field, i) =>
                  i === index ? { ...field, context: e.target.value } : field
                )
              )
            }
          />
          <FormError className="text-sm" error={getError("context")} />
        </div>
      </div>
      <div className="">
        <FormInput
          label="Placeholder"
          type="input"
          value={data.placeholder}
          placeholder="Enter your form field"
          onChange={(e) =>
            setFormFields((old) =>
              old.map((field, i) =>
                i === index ? { ...field, placeholder: e.target.value } : field
              )
            )
          }
        />
        <FormError className="text-sm" error={getError("placeholder")} />
      </div>
      <div className="flex flex-row items-end gap-2">
        <div className="">
          <FormInput
            required
            type="select"
            className="w-full"
            label="Input Type"
            placeholder="Select Input type"
            selected={data.type}
            options={["input", "textarea"]}
            onChange={(e) =>
              setFormFields((old) =>
                old.map((field, i) =>
                  i === index ? { ...field, type: e.target.value } : field
                )
              )
            }
          />
        </div>
        <div className="flex-1">
          <FormInput
            type="select"
            className=""
            selected={"1"}
            label="Row span"
            placeholder="Select a type"
            options={Array(10)
              .fill(0)
              .map((_, index) => (index + 1).toString())}
            onChange={(e) =>
              setFormFields((old) =>
                old.map((field, i) =>
                  i === index
                    ? { ...field, rowspan: Number(e.target.value) }
                    : field
                )
              )
            }
          />
        </div>

        <FormInput
          type="checkbox"
          label="Required"
          checked={!!data.required}
          placeholder="Enter your form field"
          onChange={() =>
            setFormFields((old) =>
              old.map((field, i) =>
                i === index ? { ...field, required: !field?.required } : field
              )
            )
          }
          className="size-4 bg-dark-2 text-white w-full"
        />

        <Button
          onClick={() =>
            setFormFields((old) => old.filter((_, i) => i != index))
          }
          type="button"
          size="lg"
          variant="destructive"
          className=""
        >
          <Trash2 strokeWidth={3} height={10} width={10} />
        </Button>
      </div>
    </div>
  );
}
