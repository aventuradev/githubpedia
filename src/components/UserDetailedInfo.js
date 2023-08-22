import { TbUsers } from 'react-icons/tb'
import { BsTwitter } from 'react-icons/bs'
import { LuBuilding } from 'react-icons/lu'
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlineLink } from 'react-icons/ai'

import React from 'react'

const UserDetailedInfo = ({user}) => {
    return (
        <>
            <small className='url'><AiOutlineLink />
                <a href={user.html_url}>
                    {user.html_url}
                </a>
            </small>
            <div className='other_info'>
                {
                    user.location && (
                        <><small className='other_info_item'> <TbUsers /><strong>{new Intl.NumberFormat('en-EN').format(user.following)}</strong> seguidos</small> -</>
                    )
                }
                {
                    user.followers && (
                        <small className='other_info_item'><strong>{new Intl.NumberFormat('en-EN').format(user.followers)}</strong> seguidores</small>
                    )
                }
            </div>
            <div className='other_info'>
                {
                    user.company && (
                        <><small className='other_info_item'> <LuBuilding /> <strong>{user.company}</strong></small> -</>
                    )
                }
                {
                    user.twitter_username && (
                        <small className='other_info_item'><BsTwitter /> <strong>{user.twitter_username}</strong></small>
                    )
                }
            </div>
            {
                user.location && (
                    <small className='other_info_item'> <IoLocationOutline /> {user.location}</small>
                )
            }
        </>
    )
}

export default UserDetailedInfo