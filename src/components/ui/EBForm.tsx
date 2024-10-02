/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  isGadgetLoading?: boolean;
} & TFormConfig;

const EBForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  isGadgetLoading,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  // Reset form values when API data arrives
  useEffect(() => {
    if (!isGadgetLoading) {
      methods.reset(defaultValues); // Reset form with API data once available
    }
  }, [defaultValues, isGadgetLoading, methods]);

  const submit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res: any = await onSubmit(data); // Wait for the onSubmit function to complete successfully
      if (res?.success === true) {
        methods.reset(); // Reset the form once the data is submitted successfully
      }
    } catch (error) {
      // Handle any errors during submission, e.g., show error messages
      console.error("Submission failed", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default EBForm;
