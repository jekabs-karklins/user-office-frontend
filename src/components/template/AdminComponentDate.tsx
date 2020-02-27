import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { EventType } from "../../models/QuestionaryEditorModel";
import { AdminComponentSignature } from "./QuestionaryFieldEditor";
import * as Yup from "yup";
import { AdminComponentShell } from "./AdminComponentShell";
import FormikUICustomDependencySelector from "../common/FormikUICustomDependencySelector";
import TitledContainer from "../common/TitledContainer";
import FormikUICustomCheckbox from "../common/FormikUICustomCheckbox";
import { useNaturalKeySchema } from "../../utils/userFieldValidationSchema";

export const AdminComponentDate: AdminComponentSignature = props => {
  const field = props.field;
  const naturalKeySchema = useNaturalKeySchema(field.natural_key);
  return (
    <Formik
      initialValues={field}
      onSubmit={async vals => {
        props.dispatch({
          type: EventType.UPDATE_FIELD_REQUESTED,
          payload: {
            field: { ...field, ...vals }
          }
        });
        props.closeMe();
      }}
      validationSchema={Yup.object().shape({
        natural_key: naturalKeySchema,
        question: Yup.string().required("Question is required")
      })}
    >
      {formikProps => (
        <Form style={{ flexGrow: 1 }}>
          <AdminComponentShell {...props} label="Date">
            <Field
              name="natural_key"
              label="Key"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              inputProps={{ "data-cy": "natural_key" }}
            />
            <Field
              name="question"
              label="Question"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              inputProps={{ "data-cy": "question" }}
            />
            <Field
              name="config.tooltip"
              label="Tooltip"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="tooltip"
            />
            <TitledContainer label="Constraints">
              <Field
                name="config.required"
                label="Is required"
                checked={formikProps.values.config.required}
                component={FormikUICustomCheckbox}
                margin="normal"
                fullWidth
                data-cy="required"
              />
            </TitledContainer>
            <TitledContainer label="Dependencies">
              <Field
                name="dependencies"
                component={FormikUICustomDependencySelector}
                templateField={props.field}
                template={props.template}
                label="User must check it to continue"
                margin="normal"
                fullWidth
                data-cy="dependencies"
              />
            </TitledContainer>
          </AdminComponentShell>
        </Form>
      )}
    </Formik>
  );
};