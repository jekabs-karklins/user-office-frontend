import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import PeopleTable from "../user/PeopleTable";
import { AddBox } from "@material-ui/icons";

function ParticipantModal(props: {
  title: string;
  addParticipant: any;
  show: boolean;
  close: any;
  selectedUsers?: number[];
  userRole: string;
}) {
  const addUser = (rowData: any) => {
    props.addParticipant({
      firstname: rowData.firstname,
      lastname: rowData.lastname,
      organisation: rowData.organisation,
      id: rowData.id
    });
  };
  return (
    <Dialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.show}
      onClose={() => props.close()}
    >
      <DialogContent>
        <PeopleTable
          title={props.title}
          actionText="Select user"
          actionIcon={<AddBox />}
          action={addUser}
          selectedUsers={props.selectedUsers}
          userRole={props.userRole}
          emailInvite={true}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ParticipantModal;