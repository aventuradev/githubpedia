import { Octokit } from 'octokit'
import { useState } from 'react'

const useUsers = () => {
    const octokit = new Octokit({
        auth: process.env.GIGITHUB_TOKEN
    })
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const getUsers = async () => {
        // const usersPerPage = users.length + 15;
        const usersPerPage = users.length + 15;
        try {
            setLoading(true);
            const res = await octokit.request(`GET /users?&per_page=${usersPerPage}`, {
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            
            const arrUsers = [];
            for(let user of res.data){
                const userData = await getUser(user.login);
                arrUsers.push({...user, ...userData})
            }
            setUsers([...arrUsers])
            setLoading(false)

        } catch (error) {
            setLoading(false);
            return { status: error.status, msg: error.data.message }
        }

    }
    const getUser = async (username) => {
        try {
            setLoading(true);
            const res =  await octokit.request(`GET /users/${username}`, {
                username: 'USERNAME',
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })
            // setUsers([...res.data])
            // setLoading(false)
            return res.data;
        } catch (error) {
            setLoading(false);
            return { status: error.status, msg: error.data.message }
        }

    }

    return { users, getUsers, loading }
}

export default useUsers