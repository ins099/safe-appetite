/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import Input from './CustomInput';
import DateTimePicker from './DateTimePicker';
import PhoneInput from './PhoneInput';
import OTPInput from './OTPInput';
import OptionList from './OptionList';
import {OptionProps} from './interface';

type Field = {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  type:
    | 'date'
    | 'text'
    | 'time'
    | 'textarea'
    | 'option'
    | 'radio'
    | 'phoneNumber'
    | 'image-picker'
    | string;
  options?: OptionProps[];
  defaultValue?: any;
};

interface FieldsType {
  control: Control<any, any>;
  fields: Field[];
}

const Fields: React.FC<FieldsType> = props => {
  const {control, fields, ...rest} = props;

  return fields.map(i => (
    <Controller
      control={control}
      name={i.name}
      key={i.name}
      defaultValue={i?.defaultValue}
      rules={i?.rules}
      render={({field, fieldState}) => {
        if (i.type === 'date') {
          return (
            <DateTimePicker
              value={field.value}
              onChange={field.onChange}
              error={fieldState?.error?.message}
              {...i}
            />
          );
        }
        if (i.type === 'phoneNumber') {
          return (
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              error={fieldState?.error?.message}
              {...i}
            />
          );
        }
        if (i.type === 'otp') {
          return (
            <OTPInput
              value={field.value}
              onChange={field.onChange}
              error={fieldState?.error?.message}
              {...i}
            />
          );
        }
        if (i.type === 'options') {
          return (
            <OptionList
              options={i.options}
              value={field.value}
              onChange={field.onChange}
              {...i}
            />
          );
        }
        return (
          <Input
            value={field.value}
            onChange={field.onChange}
            error={fieldState?.error?.message}
            {...i}
          />
        );
      }}
    />
  ));
};

export default Fields;
