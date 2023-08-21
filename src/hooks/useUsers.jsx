import { Octokit } from 'octokit'
import { useState } from 'react'

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const getUsers = async () => {
        const usersPerPage = users.length + 15;
        setLoading(true);
        try {
            const octokit = new Octokit({
                auth: process.env.GIGITHUB_TOKEN
            })
            
            const res = await octokit.request(`GET /users?&per_page=${usersPerPage}`, {
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            setUsers([...res.data])
            setLoading(false)

        } catch (error) {
            setLoading(false);
            return { status: error.status, msg: error.data.message }
        }

    }

    return { users, getUsers, loading }
}

export default useUsers