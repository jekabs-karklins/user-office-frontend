import React, { Fragment } from "react";
import { QuestionaryField } from "../models/ProposalModel";
import { ProposalInformation } from "../models/ProposalModel";
import { getAllFields } from "../models/ProposalModelFunctions";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  makeStyles
} from "@material-ui/core";

export default function ProposaQuestionaryReview(props: {
  data: ProposalInformation;
}) {
  const questionary = props.data.questionary!;

  if (!props.data) {
    return <div>Loading...</div>;
  }

  const classes = makeStyles(theme => ({
    heading: {
      marginTop: theme.spacing(2)
    }
  }))();

  const allFields = getAllFields(questionary) as QuestionaryField[];
  const completedFields = allFields.filter(field => {
    return !!field.value;
  });
  console.log(props)

  return (
    <Fragment>
      <Typography variant="h6" className={classes.heading} gutterBottom>
        Proposal Review
      </Typography>
        <Table>
          <TableBody>
          <TableRow key="title">
                <TableCell>Title</TableCell>
                <TableCell>{props.data.title}</TableCell>
              </TableRow>
              <TableRow key="abstract">
                <TableCell>Abstract</TableCell>
                <TableCell>{props.data.abstract}</TableCell>
              </TableRow>
              <TableRow key="principalinvestigator">
                <TableCell>Principal Investigator</TableCell>
                <TableCell>{`${props.data.proposer.firstname} ${props.data.proposer.surname}`}</TableCell>
              </TableRow>
              <TableRow key="coproposers">
                <TableCell>Co-Proposers</TableCell>
                <TableCell>{props.data.users.map((user:any) => ` ${user.name} ${user.surname}`).toString()}</TableCell>
              </TableRow>
            {completedFields.map((row: QuestionaryField) => (
              <TableRow key={row.proposal_question_id}>
                <TableCell>{row.question}</TableCell>
                <TableCell>{row.value.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Fragment>
  );
}
