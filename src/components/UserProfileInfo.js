import React from 'react'
import UserDetailedInfo from '@/components/UserDetailedInfo'

const UserProfileInfo = ({user}) => {
    return (
        <section className='user_info'>
            <img src={user.avatar_url} alt={`user ${user.login} avatar`} />
            <p className='name'>{user.name}</p>
            <p className='username'>{user.login}</p>
            <hr />
            <p className='bio'>{user?.bio}</p>
            <UserDetailedInfo user={user} />
        </section>
    )
}

export default UserProfileInfo