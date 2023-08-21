'use client'
import React, { useEffect } from 'react'
import useUsers from '@/hooks/useUsers'

const IndexPage = () => {
  const { users, getUsers, loading } = useUsers();
    useEffect(() => {
      getUsers()
    }, [])
   return (
    <div>
      <h1>Index Page</h1>
      {
        !loading && users.length > 0 && (
          <ul>{users.map( user => (
            <li key={user.id} >
              <h1>{user.login}</h1>
            </li>
          ) )}</ul>
        ) 
      }

    </div>
  )
}

export default IndexPage