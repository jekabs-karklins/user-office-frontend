import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import FormikUICustomDependencySelector from 'components/common/FormikUICustomDependencySelector';
import FormikUICustomEditor from 'components/common/FormikUICustomEditor';
import TitledContainer from 'components/common/TitledContainer';
import { EmbellishmentConfig, QuestionTemplateRelation } from 'generated/sdk';

import { TFormSignature } from '../TFormSignature';
import { QuestionTemplateRelationFormShell } from './QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationEmbellismentForm: TFormSignature<QuestionTemplateRelation> = props => {
  return (
    <QuestionTemplateRelationFormShell
      closeMe={props.closeMe}
      dispatch={props.dispatch}
      questionRel={props.field}
      label="Embellishment"
      template={props.template}
      validationSchema={Yup.object().shape({
        question: Yup.object({
          config: Yup.object({
            html: Yup.string().required('Content is required'),
            plain: Yup.string().required('Plain description is required'),
          }),
        }),
      })}
    >
      {formikProps => (
        <>
          <Field
            name="config.html"
            type="text"
            component={FormikUICustomEditor}
            margin="normal"
            fullWidth
            init={{
              skin: false,
              content_css: false,
              plugins: ['link', 'preview', 'image', 'code'],
              toolbar: 'bold italic',
              branding: false,
            }}
            data-cy="html"
          />

          <Field
            name="config.plain"
            label="Plain description"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            data-cy="plain"
          />

          <Field
            name="config.omitFromPdf"
            checked={
              (formikProps.values.config as EmbellishmentConfig).omitFromPdf
            }
            component={FormikUICustomCheckbox}
            label="Omit from PDF"
            margin="normal"
            fullWidth
            data-cy="omit"
          />

          <TitledContainer label="Dependencies">
            <Field
              name="dependency"
              component={FormikUICustomDependencySelector}
              templateField={props.field}
              template={props.template}
              margin="normal"
              fullWidth
              data-cy="dependencies"
            />
          </TitledContainer>
        </>
      )}
    </QuestionTemplateRelationFormShell>
  );
};
