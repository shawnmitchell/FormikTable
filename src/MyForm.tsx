import React from "react";
import ReactDataSheet from "react-datasheet";
import { Formik, Form, FieldArray, Field, FieldProps, getIn } from "formik";
import * as yup from "yup";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TextField,
  Select,
  Input,
  MenuItem,
  Checkbox
} from "@material-ui/core";
import DatePicker from "react-datepicker";

import "react-datasheet/lib/react-datasheet.css";
import "react-datepicker/dist/react-datepicker.css";

interface IMyFormProps {}

interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
  value: number;
}

const MyCheckbox = ({ field }: FieldProps) => {
  const { value, ...rest } = field;
  return <Checkbox checked={field.value} {...rest} color="primary" />;
};

const MyDatePicker = ({ field, form }: FieldProps) => {
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

const MyTextField = ({ field, form }: FieldProps) => {
  const errorMessage = getIn(form.errors, field.name);
  return <TextField label={errorMessage} error={!!errorMessage} {...field} />;
};

const MySelect = ({ field, form }: FieldProps) => {
  return (
    <Select {...field} input={<Input name="age" id="age-helper" />}>
      <MenuItem value={1}>One</MenuItem>
      <MenuItem value={2}>Two</MenuItem>
      <MenuItem value={3}>Three</MenuItem>
      <MenuItem value={4}>Four</MenuItem>
    </Select>
  );
};

const MyForm = () => {
  const [data] = React.useState(
    [
      [{ value: true }, { value: 1 }, { value: 2 }, { value: Date.now() }],
      [{ value: true }, { value: 4 }, { value: 4 }, { value: Date.now() }],
      [{ value: true }, { value: 7 }, { value: 3 }, { value: Date.now() }],
      [{ value: true }, { value: 10 }, { value: 1 }, { value: Date.now() }]
    ].reduce((obj: {}, curr, i) => {
      return { ...obj, [`row${i}`]: curr };
    }, {})
  );
  const x = Object.keys(data).reduce((acc, row) => {
    return {
      ...acc,
      [row]: yup.array().of(
        yup.object().shape({
          value:
            //yup.number().required("numbers only"),
            yup
              .number()
              .typeError("Numbers please")
              .required("must enter a number")
        })
      )
    };
  }, {});

  return (
    <Formik
      initialValues={data}
      onSubmit={() => {}}
      validateOnBlur
      validationSchema={yup.object().shape(x)}
    >
      {({ values }) => {
        return (
          <Form>
            <Table>
              <TableHead>
                <TableRow key={"header"}>
                  <TableCell>Enabled</TableCell>
                  <TableCell>ABC</TableCell>
                  <TableCell>DEF</TableCell>
                  <TableCell>GHI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(values).map(key => {
                  return (
                    <FieldArray name={key}>
                      {({ name }) => {
                        return (
                          <TableRow key={name}>
                            <TableCell key={`${name}[0]`}>
                              <Field
                                name={`${name}[0].value`}
                                component={MyCheckbox}
                              />
                            </TableCell>
                            <TableCell key={`${name}[1]`}>
                              <Field
                                name={`${name}[1].value`}
                                component={MyTextField}
                              />
                            </TableCell>
                            <TableCell key={`${name}[2]`}>
                              <Field
                                name={`${name}[2].value`}
                                component={MySelect}
                              />
                            </TableCell>
                            <TableCell key={`${name}[3]`}>
                              <Field
                                name={`${name}[3].value`}
                                component={MyDatePicker}
                              />
                            </TableCell>
                            {/* {values[name].map((value, index) => (
                              <TableCell key={`${name}[${index}]`}>
                                  <Field
                                  name={`${name}[${index}].value`}
                                  component={MyTextField}
                                />
                                 </TableCell>
                               ))} */}
                          </TableRow>
                        );
                      }}
                    </FieldArray>
                  );
                })}
              </TableBody>
            </Table>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MyForm;
