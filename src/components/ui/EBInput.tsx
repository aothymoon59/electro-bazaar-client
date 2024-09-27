import { Form, Input, Skeleton } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  required?: boolean;
  rules?: object;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  showPass?: boolean;
  placeholder?: string;
  defaultValue?: string;
  isLoading?: boolean;
  isUpdating?: boolean;
};

const EBInput = ({
  type,
  name,
  label,
  required,
  rules = {},
  suffix,
  prefix,
  showPass,
  placeholder,
  isLoading,
  isUpdating,
}: TInputProps) => {
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
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        rules={combinedRules}
        render={({ field }) => (
          <Form.Item
            label={`${label}${required ? "*" : ""}`}
            validateStatus={errors[name] ? "error" : ""}
            help={errorMessage} // Pass the string error message safely
          >
            {isLoading ? (
              <Skeleton.Input active size={"large"} block />
            ) : (
              <Input
                {...field}
                type={showPass ? "text" : type}
                id={name}
                size="large"
                prefix={prefix}
                suffix={suffix}
                placeholder={placeholder}
                disabled={isUpdating}
              />
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default EBInput;
