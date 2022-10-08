import React from "react";
import {
  Layout,
  Select,
  SelectItem,
  SelectProps,
  IndexPath,
  Text,
} from "@ui-kitten/components";
import {
  useFormContext,
  useController,
  UseControllerProps,
} from "react-hook-form";
import TGenericList from "../../utils/types/TGenericList";

interface CustomSelectProp<T extends Omit<TGenericList, "price">>
  extends UseControllerProps,
    SelectProps {
  label: string;
  collection: readonly T[];
  defaultValue?: string;
}

const CustomSelect = <T extends Omit<TGenericList, "price">>(
  props: CustomSelectProp<T>
) => {
  const formContext = useFormContext();
  const { label, collection, name, rules, defaultValue, ...selectProps } =
    props;

  if (!formContext || !name) {
    const msg = !formContext
      ? "Select must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  const { field } = useController({ name, rules, defaultValue });

  return (
    <Select
      value={collection.find((item) => item.id === field.value)?.name}
      label={label}
      placeholder={label}
      accessibilityLabel={label}
      onSelect={(index) => {
        const parsedIndex = index as IndexPath;
        field.onChange(collection[parsedIndex.row].id);
      }}
      {...selectProps}
    >
      {collection.map((item) => (
        <SelectItem key={item.id} title={item.name} />
      ))}
    </Select>
  );
};

export default CustomSelect;
