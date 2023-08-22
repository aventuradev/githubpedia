'use client'
import useUsers from '@/hooks/useUsers';
import React, { useEffect, useState } from 'react';
import './users.css'
import UsersList from '@/components/UsersList';

const Users = () => {
  const { users: usersRequested, getUsers, loading } = useUsers();
  const [users, setUsers] = useState(usersRequested);

  useEffect(() => {
    getUsers()
  }, []);

  useEffect(() => {
    setUsers(usersRequested)
  }, [usersRequested]);


  return (
    <>
      {loading && <p>Loading...</p>}

      {users.length > 0 && (
        <UsersList users={users} />
      )}
    </>
  )
}

export default Users
