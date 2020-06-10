import React from 'react';

import { DataType, ProposalTemplate, Question } from '../../../generated/sdk';
import { Event } from '../../../models/QuestionaryEditorModel';
import JSDict from '../../../utils/Dictionary';
import ModalWrapper from '../ModalWrapper';
import { QuestionBooleanForm } from './question/QuestionBooleanForm';
import { QuestionDateForm } from './question/QuestionDateForm';
import { QuestionEmbellismentForm } from './question/QuestionEmbellismentForm';
import { QuestionFileUploadForm } from './question/QuestionFileUploadForm';
import { QuestionMultipleChoiceForm } from './question/QuestionMultipleChoiceForm';
import { QuestionTextInputForm } from './question/QuestionTextInputForm';
import { TFormSignature } from './TFormSignature';

export default function QuestionEditor(props: {
  field: Question | null;
  dispatch: React.Dispatch<Event>;
  closeMe: () => void;
  template: ProposalTemplate;
}) {
  const componentMap = JSDict.Create<DataType, TFormSignature<Question>>();
  componentMap.put(DataType.BOOLEAN, QuestionBooleanForm);
  componentMap.put(DataType.EMBELLISHMENT, QuestionEmbellismentForm);
  componentMap.put(DataType.FILE_UPLOAD, QuestionFileUploadForm);
  componentMap.put(DataType.DATE, QuestionDateForm);
  componentMap.put(DataType.SELECTION_FROM_OPTIONS, QuestionMultipleChoiceForm);
  componentMap.put(DataType.TEXT_INPUT, QuestionTextInputForm);

  if (props.field === null) {
    return null;
  }

  return (
    <ModalWrapper closeMe={props.closeMe} isOpen={props.field != null}>
      {React.createElement(componentMap.get(props.field.dataType)!, {
        field: props.field,
        dispatch: props.dispatch,
        closeMe: props.closeMe,
        template: props.template,
      })}
    </ModalWrapper>
  );
}
