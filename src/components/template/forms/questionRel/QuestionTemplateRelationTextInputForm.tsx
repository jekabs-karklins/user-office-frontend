import Collapse from '@material-ui/core/Collapse';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import FormikUICustomDependencySelector from 'components/common/FormikUICustomDependencySelector';
import FormikUICustomEditor from 'components/common/FormikUICustomEditor';
import TitledContainer from 'components/common/TitledContainer';
import { QuestionTemplateRelation, TextInputConfig } from 'generated/sdk';

import { TFormSignature } from '../TFormSignature';
import { QuestionExcerpt } from './QuestionExcerpt';
import { QuestionTemplateRelationFormShell } from './QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationTextInputForm: TFormSignature<QuestionTemplateRelation> = props => {
  const [isRichQuestion, setIsRichQuestion] = useState<boolean>(
    (props.field.config as TextInputConfig).isHtmlQuestion
  );

  return (
    <QuestionTemplateRelationFormShell
      label="Text input"
      closeMe={props.closeMe}
      dispatch={props.dispatch}
      questionRel={props.field}
      template={props.template}
      validationSchema={Yup.object().shape({
        question: Yup.object({
          config: Yup.object({
            min: Yup.number().nullable(),
            max: Yup.number().nullable(),
            required: Yup.boolean(),
            placeholder: Yup.string(),
            multiline: Yup.boolean(),
            isHtmlQuestion: Yup.boolean(),
          }),
        }),
      })}
    >
      {formikProps => (
        <>
          <QuestionExcerpt question={props.field.question} />

          <TitledContainer label="Constraints">
            <Field
              name="config.required"
              checked={formikProps.values.config.required}
              component={FormikUICustomCheckbox}
              label="Is required"
              margin="normal"
              fullWidth
              data-cy="required"
            />

            <Field
              name="config.min"
              label="Min"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="min"
            />

            <Field
              name="config.max"
              label="Max"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="max"
            />
          </TitledContainer>
          <TitledContainer label="Options">
            <Field
              label="Enable rich text question"
              name="config.isHtmlQuestion"
              component={FormikUICustomCheckbox}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsRichQuestion(event.target.checked);
              }}
              checked={isRichQuestion}
            />
            <Collapse in={isRichQuestion}>
              <Field
                visible={isRichQuestion}
                name="config.htmlQuestion"
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
                data-cy="htmlQuestion"
              />
            </Collapse>
            <Field
              name="config.placeholder"
              label="Placeholder text"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="placeholder"
            />

            <Field
              name="config.multiline"
              checked={(formikProps.values.config as TextInputConfig).multiline}
              component={FormikUICustomCheckbox}
              label="Multiple lines"
              margin="normal"
              fullWidth
              data-cy="multiline"
            />
          </TitledContainer>

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
