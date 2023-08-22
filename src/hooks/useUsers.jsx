import { Octokit } from 'octokit'
import { useState } from 'react'

const useUsers = () => {
    const octokit = new Octokit({
        auth: process.env.GIGITHUB_TOKEN
    })

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [repositories, setRepositories] = useState([]);

    // Método para obtener los usuarios
    const getUsers = async () => {
        const prevUsers = [...users]; // se guarda el estado previo de los usuarios antes de la búsqueda
        try {
            setLoading(true);
            const startedId = !users.pop() ? 1 : (users.pop().id + 1) ; // Indica el id apartir del cual se hará la búsqueda
            // Los objetos del arreglo de los usuarios no vienen con toda la información
            const res = await octokit.request(`GET /users?&per_page=15&since=${startedId}`, {
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            
            //  Se actualiza el estado para presentar más pronto información al cliente
            setUsers(prevState => ([...prevState, ...res.data]));
            
            //   Se completa la busqueda de información de la información del usuario
            const arrUsers = [];
            for (let userRes of res.data) {
                const data = await getUser(userRes.login);
                arrUsers.push({ ...userRes, ...data.user })
            }
            //   Se vuelve actualizar el estado con la información completa de cada usuario
            const allUsers = [...prevUsers, ...arrUsers]
            setUsers(allUsers.filter((obj, index) => { return index === allUsers.findIndex(o => obj.login === o.login) }));
            setLoading(false)
            
        } catch (error) {
            setLoading(false);
            return { status: error.status, msg: error.data.message }
        }

    }

    const getUser = async (username) => {
        try {
            setLoading(true);
            const res = await octokit.request(`GET /users/${username}`, {
                username: 'USERNAME',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            setUser(res.data)
            setLoading(false)
            return {status: 200, user: res.data}
        } catch (error) {
            setLoading(false);
            return { status: error.status, msg: error.data.message }
        }

    }
    const getUserRepositories = async (username) => {
        try {
            setLoading(true);
            const res = await fetch(`https://api.github.com/users/${username}/repos`);
            const data =  await res.json();
            setRepositories(data);
            return {status: 200}
        } catch (error) {
            setLoading(false);
            return { status: error.status, msg: error.data.message }
        }

    }

    return { users, getUsers, user, getUser, repositories, getUserRepositories, loading }
}

export default useUsers
