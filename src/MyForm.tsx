import React from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import {
  Formik,
  Form,
  FieldArray,
  Field,
  FieldProps,
  getIn,
  FieldArrayRenderProps
} from "formik";
import * as yup from "yup";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TextField
} from "@material-ui/core";

interface IMyFormProps {}

interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
  value: number;
}

class MyReactDataSheet extends ReactDataSheet<GridElement, number> {}

const MyTextField = ({ field, form }: FieldProps) => {
  const errorMessage = getIn(form.errors, field.name);
  return <TextField label={errorMessage} error={!!errorMessage} {...field} />;
};

const MyForm = (props: IMyFormProps) => {
  const [data, setData] = React.useState(
    [
      [{ value: 1 }, { value: 2 }, { value: 3 }],
      [{ value: 4 }, { value: 5 }, { value: 6 }],
      [{ value: 7 }, { value: 8 }, { value: 9 }],
      [{ value: 10 }, { value: 11 }, { value: 12 }]
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
                            {values[name].map((value, index) => (
                              <TableCell key={`${name}[${index}]`}>
                                <Field
                                  name={`${name}[${index}].value`}
                                  component={MyTextField}
                                />
                              </TableCell>
                            ))}
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
