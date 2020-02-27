import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddBox from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { GetUserWithRolesQuery, Role } from "../../generated/sdk";
import { useDataApi } from "../../hooks/useDataApi";
import { ContentContainer, StyledPaper } from "../../styles/StyledComponents";
import { tableIcons } from "../../utils/materialIcons";
import RoleModal from "./RoleModal";

const useStyles = makeStyles({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: "25px",
    marginLeft: "10px"
  }
});

export default function UpdateUserRoles(props: { id: number }) {
  const [userData, setUserData] = useState<
    GetUserWithRolesQuery["user"] | null
  >(null);
  const [modalOpen, setOpen] = useState(false);
  const api = useDataApi();
  const { enqueueSnackbar } = useSnackbar();
  const [roles, setRoles] = useState<Array<Role>>([]);

  const addRole = (role: any) => {
    setRoles([...roles, role]);
    setOpen(false);
  };

  const removeRole = (role: any) => {
    let newRoles = [...roles];
    newRoles.splice(
      newRoles.findIndex(element => role.id === element.id),
      1
    );
    setRoles(newRoles);
  };

  const sendUserUpdate = () => {
    const variables = {
      id: props.id,
      roles: roles.map(role => role.id)
    };
    api()
      .updateUserRoles(variables)
      .then(response =>
        enqueueSnackbar("Updated Roles", {
          variant: response.updateUser.error ? "error" : "success"
        })
      );
  };

  useEffect(() => {
    const getUserInformation = () => {
      api()
        .getUserWithRoles({ id: props.id })
        .then(data => {
          setUserData({ ...data.user! });
          setRoles(data.user!.roles);
        });
    };
    getUserInformation();
  }, [props.id, api]);

  const columns = [{ title: "Name", field: "name" }];

  const classes = useStyles();

  if (!userData) {
    return <p>Loading</p>;
  }
  return (
    <ContentContainer>
      <Grid>
        <Grid item xs={12}>
          <StyledPaper>
            <RoleModal
              show={modalOpen}
              close={() => setOpen(false)}
              add={addRole}
            />
            <MaterialTable
              title="Roles"
              columns={columns}
              icons={tableIcons}
              data={roles.map((role: any) => {
                return { name: role.title, id: role.id };
              })}
              options={{
                search: false
              }}
              actions={[
                {
                  icon: () => <AddBox />,
                  tooltip: "Add Role",
                  isFreeAction: true,
                  onClick: event => setOpen(true)
                }
              ]}
              editable={{
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    resolve();
                    removeRole(oldData);
                  })
              }}
            />

            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => sendUserUpdate()}
              >
                Update Roles
              </Button>
            </div>
          </StyledPaper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}