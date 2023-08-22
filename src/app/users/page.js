'use client'
import useUsers from '@/hooks/useUsers';
import React, { useEffect } from 'react';
import { TbUsers } from 'react-icons/tb'
import { BsPinMap } from 'react-icons/bs'
import './users.css'

const Users = () => {
  const { users, getUsers, loading } = useUsers();
  useEffect(() => {
    if (users.length === 15) return;
    getUsers()
  }, []);
  console.log(users)
  return (
    <div>
      <h1>Githubpedia</h1>
      {
        !loading && users.length > 0 && (
          <ul className='users_list'>{users.map(user => (
            <li key={user.id} className='user_card'>
              <img src={user.avatar_url} alt={`user ${user.login} avatar`} />
              <div className='user_info'>
                <div className='user_names'>
                  <p className='name'>{user.name}</p>
                  <p className='username'>{user.login}</p>
                </div>
                <p className='bio'>{user.bio}</p>
                <div className='other_info'>
                  {
                    user.location && (
                      <>
                        <p className='other_info_item'> <BsPinMap /> {user.location}</p>
                        -
                      </>
                    )
                  }
                  <p className='other_info_item'> <TbUsers /> {new Intl.NumberFormat('en-EN').format(user.followers)} </p>
                </div>

              </div>
            </li>
          ))}</ul>
        )
      }

    </div>
  )
}

export default Users


const userMap = {
  login: 'mojombo',
  id: 1,
  node_id: 'MDQ6VXNlcjE=',
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/mojombo',
  html_url: 'https://github.com/mojombo',
  followers_url: 'https://api.github.com/users/mojombo/followers',
  following_url: 'https://api.github.com/users/mojombo/following{/other_user}',
  gists_url: 'https://api.github.com/users/mojombo/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/mojombo/subscriptions',
  organizations_url: 'https://api.github.com/users/mojombo/orgs',
  repos_url: 'https://api.github.com/users/mojombo/repos',
  events_url: 'https://api.github.com/users/mojombo/events{/privacy}',
  received_events_url: 'https://api.github.com/users/mojombo/received_events',
  type: 'User',
  site_admin: false
}