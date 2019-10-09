import { useEffect, useState } from "react";
import { useDataAPI } from "../hooks/useDataAPI";

export function useUsersData(filter) {
  const sendRequest = useDataAPI();
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const query = `
    query($filter: String!) {
      users(filter: $filter){
        users{
        firstname
        lastname
        username
        id
        }
        totalCount
      }
    }`;

    const variables = {
      filter: filter
    };
    setLoading(true);
    sendRequest(query, variables).then(data => {
      setUsersData(
        data.users.users.map(user => {
          return {
            name: user.firstname,
            surname: user.lastname,
            username: user.username,
            id: user.id
          };
        })
      );
      setLoading(false);
    });
  }, [filter, sendRequest]);

  return { loading, usersData };
}