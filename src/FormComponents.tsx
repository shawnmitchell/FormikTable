import React from "react";
import { FieldProps, getIn } from "formik";
import {
  TextField,
  Select,
  Input,
  MenuItem,
  Checkbox
} from "@material-ui/core";
import DatePicker from "react-datepicker";

export const MyCheckbox = ({ field }: FieldProps) => {
  const { value, ...rest } = field;
  return <Checkbox checked={field.value} {...rest} color="primary" />;
};

export const MyDatePicker = ({ field, form }: FieldProps) => {
  return (
    <DatePicker
      {...field}
      selected={field.value}
      onChange={value => form.setFieldValue(field.name, value)}
      customInput={
        <TextField
          id="standard-helperText"
          InputProps={{
            readOnly: true
          }}
        />
      }
    />
  );
};

export const MyTextField = ({ field, form }: FieldProps) => {
  const errorMessage = getIn(form.errors, field.name);
  return <TextField label={errorMessage} error={!!errorMessage} {...field} />;
};

export const MySelect = ({ field }: FieldProps) => {
  return (
    <Select {...field} input={<Input name="age" id="age-helper" />}>
      <MenuItem value={1}>One</MenuItem>
      <MenuItem value={2}>Two</MenuItem>
      <MenuItem value={3}>Three</MenuItem>
      <MenuItem value={4}>Four</MenuItem>
    </Select>
  );
};
