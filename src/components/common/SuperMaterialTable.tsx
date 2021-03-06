import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import MaterialTable, { MaterialTableProps } from 'material-table';
import React, { useState } from 'react';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import InputDialog from 'components/common/InputDialog';
import { tableIcons } from 'utils/materialIcons';

interface SuperProps<RowData extends object> {
  createModal: (
    onUpdate: (object: RowData) => void,
    onCreate: (object: RowData) => void,
    object: RowData | null
  ) => React.ReactNode;
  delete: (id: number) => Promise<boolean>;
  setData: Function;
  data: RowData[];
  hasAccess?: { create?: boolean; update?: boolean; remove?: boolean };
}

interface EntryID {
  id: number;
}

export default function SuperMaterialTable<Entry extends EntryID>({
  hasAccess = {
    create: true,
    remove: true,
    update: true,
  },
  ...props
}: MaterialTableProps<Entry> & SuperProps<Entry>) {
  const [show, setShow] = useState(false);
  const [editObject, setEditObject] = useState<Entry | null>(null);

  const onCreated = (objectAdded: Entry) => {
    props.setData([...props.data, objectAdded]);
    setShow(false);
  };

  const onUpdated = (objectUpdated: Entry) => {
    if (objectUpdated) {
      const newObjectsArray = props.data.map(objectItem =>
        objectItem.id === objectUpdated.id ? objectUpdated : objectItem
      );
      props.setData(newObjectsArray);
    }
    setEditObject(null);
    setShow(false);
  };

  const onDeleted = async (deletedId: number) => {
    const deleteResult = await props.delete(deletedId);

    if (!deleteResult) {
      const newObjectsArray = props.data.filter(
        objectItem => objectItem.id !== deletedId
      );
      props.setData(newObjectsArray);
    }
  };

  const EditIcon = (): JSX.Element => <Edit />;
  let actions: (
    | import('material-table').Action<Entry>
    | ((rowData: Entry) => import('material-table').Action<Entry>)
  )[] = [];
  if (props.actions) {
    actions = props.actions;
  }

  return (
    <>
      <InputDialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        onClose={() => {
          setShow(false);
          setEditObject(null);
        }}
      >
        {props.createModal(onUpdated, onCreated, editObject)}
      </InputDialog>
      <MaterialTable
        {...props}
        icons={tableIcons}
        editable={
          hasAccess.remove
            ? {
                onRowDelete: (rowData: Entry): Promise<void> =>
                  onDeleted(rowData.id),
              }
            : {}
        }
        actions={
          hasAccess.update
            ? [
                {
                  icon: EditIcon,
                  tooltip: 'Edit',
                  onClick: (_event: unknown, rowData: Entry | Entry[]) => {
                    setShow(true);
                    setEditObject(rowData as Entry);
                  },
                  position: 'row',
                },
                ...actions,
              ]
            : [...actions]
        }
      />
      {hasAccess.create && (
        <ActionButtonContainer>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => setShow(true)}
          >
            Create
          </Button>
        </ActionButtonContainer>
      )}
    </>
  );
}
