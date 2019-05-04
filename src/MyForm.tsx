import React, { ReactElement } from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import * as yup from "yup";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Grid,
  Paper,
  Button
} from "@material-ui/core";
import {
  MyCheckbox,
  MyDatePicker,
  MySelect,
  MyTextField
} from "./FormComponents";
import "react-datasheet/lib/react-datasheet.css";
import "react-datepicker/dist/react-datepicker.css";

export const MyContainer: React.SFC<ReactElement> = ({ children }) => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Paper>{children}</Paper>
    </Grid>
  );
};

interface IMyForm {
  data: Array<Array<{ value: boolean | number | Date }>>;
  handleSubmit: ({}) => void;
}

export const MyForm: React.SFC<IMyForm> = ({ data, handleSubmit }) => {
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
      initialValues={data.reduce((obj: {}, curr, i) => {
        return { ...obj, [`row${i}`]: curr };
      }, {})}
      onSubmit={handleSubmit}
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
            <Button type="submit">Submit</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
