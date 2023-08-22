'use client'
import useUsers from '@/hooks/useUsers';
import React, { useEffect, useState } from 'react';
import './users.css'
import UsersList from '@/components/UsersList';
import Loading from '@/shared/Loading';

const Users = () => {

  const { users, getUsers, loading } = useUsers();
  const [page, setPage] = useState(1);

  // Petición de usuarios al renderizar y paginar
  // Evita la petición al renderizar si el contexto ya tiene usuarios
  useEffect(() => {
    if (!users.length || !loading) getUsers();
  }, [page]);


  // Manejo de petición para scroll infinito
  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) setPage((prev) => prev + 1);

  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  if (!users.length) return <Loading />

  return (
    <>
      {users.length > 0 && (
        <UsersList users={users} />
      )}
    </>
  )
}


export default Users
