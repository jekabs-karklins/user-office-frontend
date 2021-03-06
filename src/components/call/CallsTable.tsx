import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import dateformat from 'dateformat';
import MaterialTable from 'material-table';
import React, { useState } from 'react';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import InputDialog from 'components/common/InputDialog';
import ScienceIconAdd from 'components/common/ScienceIconAdd';
import { Call, InstrumentWithAvailabilityTime } from 'generated/sdk';
import { useCallsData } from 'hooks/call/useCallsData';
import { tableIcons } from 'utils/materialIcons';

import AssignedInstrumentsTable from './AssignedInstrumentsTable';
import AssignInstrumentsToCall from './AssignInstrumentsToCall';
import CreateUpdateCall from './CreateUpdateCall';

const CallsTable: React.FC = () => {
  const [show, setShow] = useState(false);
  const { loadingCalls, callsData, setCallsData } = useCallsData();
  const [editCall, setEditCall] = useState<Call | null>(null);
  const [assigningInstrumentsCallId, setAssigningInstrumentsCallId] = useState<
    number | null
  >(null);

  const columns = [
    { title: 'Short Code', field: 'shortCode' },
    {
      title: 'Start Date',
      field: 'startCall',
      render: (rowData: Call): string =>
        dateformat(new Date(rowData.startCall), 'dd-mmm-yyyy'),
    },
    {
      title: 'End Date',
      field: 'endCall',
      render: (rowData: Call): string =>
        dateformat(new Date(rowData.endCall), 'dd-mmm-yyyy'),
    },
    {
      title: 'Instruments',
      render: (rowData: Call): string =>
        rowData.instruments && rowData.instruments.length > 0
          ? rowData.instruments.length.toString()
          : '-',
    },
  ];

  const onCallCreated = (callAdded: Call | null) => {
    callAdded && setCallsData([...(callsData as Call[]), callAdded]);

    setShow(false);
  };

  const onCallUpdated = (callUpdated: Call | null) => {
    if (callUpdated) {
      const newCallsArray = (callsData as Call[]).map(callItem =>
        callItem.id === callUpdated.id ? callUpdated : callItem
      );

      setCallsData(newCallsArray);
    }

    setEditCall(null);
  };

  const assignInstrumentsToCall = (
    instruments: InstrumentWithAvailabilityTime[]
  ) => {
    if (callsData) {
      const newCallsData = callsData.map(callItem => {
        if (callItem.id === assigningInstrumentsCallId) {
          return {
            ...callItem,
            instruments: [...callItem.instruments, ...instruments],
          };
        } else {
          return callItem;
        }
      });

      setCallsData(newCallsData);
      setAssigningInstrumentsCallId(null);
    }
  };

  const removeAssignedInstrumentFromCall = (
    updatedInstruments: InstrumentWithAvailabilityTime[],
    callToRemoveFromId: number
  ) => {
    if (callsData) {
      const newCallsData = callsData.map(callItem => {
        if (callItem.id === callToRemoveFromId) {
          return {
            ...callItem,
            instruments: updatedInstruments,
          };
        } else {
          return callItem;
        }
      });

      setCallsData(newCallsData);
      setAssigningInstrumentsCallId(null);
    }
  };

  const setInstrumentAvailabilityTime = (
    updatedInstruments: InstrumentWithAvailabilityTime[],
    updatingCallId: number
  ) => {
    if (callsData) {
      const newCallsData = callsData.map(callItem => {
        if (callItem.id === updatingCallId) {
          return {
            ...callItem,
            instruments: updatedInstruments,
          };
        } else {
          return callItem;
        }
      });

      setCallsData(newCallsData);
    }
  };

  const EditIcon = (): JSX.Element => <Edit />;
  const ScienceIconComponent = (): JSX.Element => <ScienceIconAdd />;

  const AssignedInstruments = (rowData: Call) => (
    <AssignedInstrumentsTable
      call={rowData}
      removeAssignedInstrumentFromCall={removeAssignedInstrumentFromCall}
      setInstrumentAvailabilityTime={setInstrumentAvailabilityTime}
    />
  );

  const callAssignments = callsData?.find(
    callItem => callItem.id === assigningInstrumentsCallId
  );

  return (
    <>
      <InputDialog
        maxWidth="xs"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!editCall || show}
        onClose={(): void => (!!editCall ? setEditCall(null) : setShow(false))}
      >
        <CreateUpdateCall
          call={editCall}
          close={(call): void => {
            !!editCall ? onCallUpdated(call) : onCallCreated(call);
          }}
        />
      </InputDialog>
      {assigningInstrumentsCallId && (
        <InputDialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!!assigningInstrumentsCallId}
          onClose={(): void => setAssigningInstrumentsCallId(null)}
        >
          <AssignInstrumentsToCall
            assignedInstruments={
              callAssignments?.instruments as InstrumentWithAvailabilityTime[]
            }
            callId={assigningInstrumentsCallId}
            assignInstrumentsToCall={(
              instruments: InstrumentWithAvailabilityTime[]
            ) => assignInstrumentsToCall(instruments)}
          />
        </InputDialog>
      )}
      <MaterialTable
        icons={tableIcons}
        title="Calls"
        columns={columns}
        data={callsData as Call[]}
        isLoading={loadingCalls}
        detailPanel={[
          {
            tooltip: 'Show Instruments',
            render: AssignedInstruments,
          },
        ]}
        options={{
          search: false,
        }}
        actions={[
          {
            icon: EditIcon,
            tooltip: 'Edit Call',
            onClick: (event, rowData): void => setEditCall(rowData as Call),
            position: 'row',
          },
          {
            icon: ScienceIconComponent,
            tooltip: 'Assign Instrument',
            onClick: (event, rowData): void =>
              setAssigningInstrumentsCallId((rowData as Call).id),
            position: 'row',
          },
        ]}
      />
      <ActionButtonContainer>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => setShow(true)}
          data-cy="add-call"
        >
          Create call
        </Button>
      </ActionButtonContainer>
    </>
  );
};

export default CallsTable;
