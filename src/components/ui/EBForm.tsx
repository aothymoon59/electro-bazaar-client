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
  isSubmitSuccess?: boolean;
  isGadgetLoading?: boolean;
} & TFormConfig;

const EBForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  isSubmitSuccess,
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

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    if (isSubmitSuccess) {
      methods.reset();
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
