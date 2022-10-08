import React from 'react';
import { Input, InputProps } from '@ui-kitten/components';
import {
  useFormContext,
  useController,
  UseControllerProps,
} from 'react-hook-form';

interface CustomSelectProp extends UseControllerProps, InputProps {
  label: string;
  defaultValue?: string;
}

const CustomInput = (props: CustomSelectProp) => {
  const formContext = useFormContext();
  const { label, name, rules, defaultValue, ...inputProps } = props;

  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    return null;
  }

  const { field } = useController({ name, rules, defaultValue });

  return (
    <Input
      label={label}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      {...inputProps}
    />
  );
};

export default CustomInput;
