import { cn } from "@/lib/utils";

function FormInput({
  label,
  type,
  placeholder,
  rows = 1,
  required = false,
  className,
  accept = "image/*",
  options,
  name,
  selected,
  onChange,
  ...props
}: {
  label: string;
  type: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
  accept?: string;
  className?: string;
  options?: string[];
  name?: string;
  selected?: string;
  onChange?: (e: any) => void;
  value?: string;
  checked?: boolean;
  defaultValue?: string;
}) {
  const classNames = cn(
    "py-2 px-4 border-2 rounded-md [resize:none]",
    className
  );

  const renderInput = () => {
    switch (type) {
      case "input":
        return (
          <input
            name={name}
            required={required}
            className={classNames}
            type="input"
            placeholder={placeholder}
            onChange={onChange}
            {...props}
          />
        );
      case "textarea":
        return (
          <textarea
            name={name}
            required={required}
            className={classNames}
            placeholder={placeholder}
            rows={rows}
            onChange={onChange}
            {...props}
          />
        );
      case "file":
        return (
          <input
            name={name}
            required={required}
            type="file"
            accept={accept}
            className={classNames}
            onChange={onChange}
            {...props}
          />
        );

      case "select":
        return (
          <select
            name={name}
            required={required}
            className={cn(classNames, className)}
            defaultValue={selected}
            onChange={onChange}
            {...props}
          >
            {options &&
              options.map((option, index) => (
                <option
                  key={index}
                  value={option}
                  className="bg-background text-foreground dark:text-white"
                >
                  {option}
                </option>
              ))}
          </select>
        );
      case "checkbox":
        return (
          <input
            name={name}
            required={required}
            className={`${classNames} `}
            type="checkbox"
            onChange={onChange}
            {...props}
          />
        );
      case "radio":
        return (
          <input
            name={name}
            required={required}
            className={classNames}
            type="radio"
            onChange={onChange}
            {...props}
          />
        );
      case "email":
        return (
          <input
            name={name}
            required={required}
            className={classNames}
            type="email"
            placeholder={placeholder}
            onChange={onChange}
            {...props}
          />
        );
      case "password":
        return (
          <input
            name={name}
            required={required}
            className={classNames}
            type="password"
            placeholder={placeholder}
            onChange={onChange}
            {...props}
          />
        );
      default:
        return (
          <input
            name={name}
            required={required}
            className={classNames}
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            {...props}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {renderInput()}
    </div>
  );
}

export default FormInput;

export const FormError = ({
  error,
  className,
}: {
  error?: string | null;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "text-red-500/90 pt-[2px]",
        {
          hidden: !error,
        },
        className
      )}
    >
      {error}
    </div>
  );
};
