import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ProposalInformation from "./ProposalInformation";
import ProposalParticipants from "./ProposalParticipants";
import ReviewTable from "./ReviewTable";
import { useProposalData } from "../hooks/useProposalData";
import { useAddUserForReview } from "../hooks/useAddUserForReview";
import { useRemoveUserForReview } from "../hooks/useRemoveUserForReview";

import { Add } from "@material-ui/icons";
import ParticipantModal from "./ParticipantModal";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import PeopleTable from "./PeopleTable";
import ProposaQuestionaryReview from "./ProposalQuestionaryReview";
import { useProposalQuestionTemplate } from "../hooks/useProposalQuestionTemplate";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: "25px",
    marginLeft: "10px"
  }
}));

export default function ProposalReview({ match }:{match:any}) {
  const classes = useStyles();
  const [modalOpen, setOpen] = useState(false);
  const [reviewers, setReviewers] = useState<any>([]);
  const { proposalData } = useProposalData(match.params.id);
  const { proposalTemplate } = useProposalQuestionTemplate();
  const sendAddReviewer = useAddUserForReview(); 
  const sendRemoveReviewer = useRemoveUserForReview();

  useEffect(() => {
    if (proposalData) {
      setReviewers(
        proposalData.reviews.map((review:any) => {
          const { firstname, lastname, id, username } = review.reviewer;
          return {
            name: firstname,
            surname: lastname,
            username,
            id,
            reviewID: review.id
          };
        })
      );
    }
  }, [proposalData]);

  const addUser = (user:any) => {
    sendAddReviewer(user.id, parseInt(match.params.id));
    setReviewers([...reviewers, user]);
    setOpen(false);
  };

  const removeUser = (user:any) => {
    let newUsers = [...reviewers];
    newUsers.splice(newUsers.indexOf(user), 1);
    setReviewers(newUsers);
    sendRemoveReviewer(user.reviewID);
  };

  if (!proposalData || !proposalTemplate) {
    return <p>Loading</p>;
  }

  proposalData.answers!.forEach(answer => {
    proposalTemplate.getFieldById(answer.proposal_question_id).value = answer.answer;
  })


  return (
    <Container maxWidth="lg">
      <Paper className={classes.paper}>
        <ProposalInformation data={proposalData} disabled={true} />
        <ProposaQuestionaryReview data={proposalData} template={proposalTemplate} />
        <ProposalParticipants data={proposalData}  disabled={true}/>
      </Paper>
      <Paper className={classes.paper}>
        <ReviewTable reviews={proposalData.reviews} />
      </Paper>
      <Paper className={classes.paper}>
        <ParticipantModal
          show={modalOpen}
          close={setOpen}
          addParticipant={addUser}
        />
        <PeopleTable
          title="Reviewers"
          actionIcon={<Add />}
          action={() => setOpen(true)}
          isFreeAction={true}
          data={reviewers}
          search={false}
          onRemove={removeUser}
          disabled={true}
        />
      </Paper>
    </Container>
  );
}
