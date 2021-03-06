import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import MaterialTable from 'material-table';
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import Can from 'components/common/Can';
import InputDialog from 'components/common/InputDialog';
import { UserContext } from 'context/UserContextProvider';
import { Sep, UserRole } from 'generated/sdk';
import { useSEPsData } from 'hooks/SEP/useSEPsData';
import { tableIcons } from 'utils/materialIcons';

import AddSEP from './General/AddSEP';

const SEPsTable: React.FC = () => {
  const { currentRole } = useContext(UserContext);
  const history = useHistory();
  const { loading, SEPsData, setSEPsData } = useSEPsData(
    '',
    false,
    currentRole as UserRole
  );
  const [show, setShow] = useState(false);
  const columns = [
    { title: 'Code', field: 'code' },
    { title: 'Description', field: 'description' },
    {
      title: 'Active',
      field: 'active',
      render: (rowData: Sep): string => (rowData.active ? 'Yes' : 'No'),
    },
  ];
  const [editSEPID, setEditSEPID] = useState(0);

  if (editSEPID) {
    return <Redirect push to={`/SEPPage/${editSEPID}`} />;
  }

  const onSepAdded = (sepAdded: Sep | null | undefined) => {
    sepAdded && setSEPsData([...SEPsData, sepAdded]);
    setShow(false);

    setTimeout(() => {
      history.push(`/SEPPage/${sepAdded?.id}`);
    });
  };

  const EditIcon = (): JSX.Element => <Edit />;

  return (
    <>
      <InputDialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        onClose={(): void => setShow(false)}
      >
        <AddSEP
          close={(sepAdded: Sep | null | undefined) => onSepAdded(sepAdded)}
        />
      </InputDialog>
      <div data-cy="SEPs-table">
        <MaterialTable
          icons={tableIcons}
          title={'Scientific evaluation panels'}
          columns={columns}
          data={SEPsData}
          isLoading={loading}
          options={{
            search: true,
            debounceInterval: 400,
          }}
          actions={[
            {
              icon: EditIcon,
              tooltip: 'Edit SEP',
              onClick: (event, rowData): void =>
                setEditSEPID((rowData as Sep).id),
              position: 'row',
            },
          ]}
        />
        <Can
          allowedRoles={[UserRole.USER_OFFICER]}
          yes={() => (
            <ActionButtonContainer>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => setShow(true)}
              >
                Create SEP
              </Button>
            </ActionButtonContainer>
          )}
          no={() => null}
        />
      </div>
    </>
  );
};

export default SEPsTable;
