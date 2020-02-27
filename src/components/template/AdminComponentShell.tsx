import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { EventType } from "../../models/QuestionaryEditorModel";
import { AdminComponentShellSignature } from "./QuestionaryFieldEditor";
import getTemplateFieldIcon from "./getTemplateFieldIcon";

export const AdminComponentShell: AdminComponentShellSignature = props => {
  const classes = makeStyles(theme => ({
    container: {
      width: "100%"
    },
    heading: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      color: theme.palette.grey[600],
      "& SVG": {
        marginRight: theme.spacing(1)
      }
    },
    actions: {
      marginTop: theme.spacing(4),
      display: "flex",
      justifyContent: "space-between"
    }
  }))();

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        {getTemplateFieldIcon(props.field.data_type)}
        {props.label}
      </Typography>
      {props.children}
      <div className={classes.actions}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          data-cy="delete"
          onClick={() => {
            props.dispatch({
              type: EventType.DELETE_FIELD_REQUESTED,
              payload: { fieldId: props.field.proposal_question_id }
            });
            props.closeMe();
          }}
        >
          Delete
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-cy="submit"
        >
          Save
        </Button>
      </div>
    </div>
  );
};