import React from 'react'
import { TbUsers } from 'react-icons/tb'
import { BsPinMap } from 'react-icons/bs'
import Link from 'next/link'

const UsersList = ({ users }) => {
  return (
    <ul className='users_list'>{users.map(user => (
      <Link key={user.login} href={`/users/${user.login}`}>
        <li className='user_card'>
          <img src={user.avatar_url} alt={`user ${user.login} avatar`} />
          <div className='user_info'>
            <div className='user_names'>
              <p className='name'>{user.name}</p>
              <p className='username'>{user.login}</p>
            </div>
            <p className='bio'>{user?.bio}</p>
            <div className='other_info'>
              {
                user.location && (
                  <>
                    <p className='other_info_item'> <BsPinMap /> {user.location}</p>
                    -
                  </>
                )
              }
              {
                user.followers && (
                  <p className='other_info_item'> <TbUsers /> {new Intl.NumberFormat('en-EN').format(user.followers)} </p>
                )
              }
            </div>

          </div>
        </li>
      </Link>
    ))}</ul>
  )
}

export default UsersList