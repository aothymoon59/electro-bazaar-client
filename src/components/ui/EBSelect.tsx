import { Form, Select, Skeleton } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TEBSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  rules?: object;
  isLoading?: boolean;
  isUpdating?: boolean;
};

const EBSelect = ({
  label,
  name,
  options,
  disabled,
  placeholder,
  required,
  rules = {},
  isLoading,
  isUpdating,
}: TEBSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Add the "required" rule conditionally
  const combinedRules = {
    ...(required && { required: `${label || "Field"} is required` }),
    ...rules, // Spread any additional rules passed in props
  };

  // Safely extract error message if it exists
  const errorMessage = errors[name]?.message
    ? String(errors[name]?.message)
    : undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={combinedRules} // Apply the conditionally set rules here
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={`${label}${required ? "*" : ""}`}
          validateStatus={errors[name] ? "error" : ""}
          help={errorMessage} // Pass the string error message safely
        >
          {isLoading ? (
            <Skeleton.Input active size={"large"} block />
          ) : (
            <Select
              placeholder={placeholder}
              style={{ width: "100%" }}
              {...field}
              options={options}
              size="large"
              disabled={disabled || isUpdating}
              status={error ? "error" : undefined}
            />
          )}
        </Form.Item>
      )}
    />
  );
};

export default EBSelect;
