import { AppContext } from '@/context/Context';
import { useContext, useState } from 'react';
import aventura from '../../aventura.json'

const useUsers = () => {
    const { user, setUser, users, setUsers, repositories, setRepositories, repository, setRepository } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    // Método para obtener los usuarios
    const getUsers = async () => {
        const prevUsers = [...users]; // se guarda el estado previo de los usuarios antes de la búsqueda
        try {
            setLoading(true);
            const startedId = !users.pop() ? 1 : (users.pop().id + 1); // Indica el id apartir del cual se hará la búsqueda
            // Los objetos del arreglo de los usuarios no vienen con toda la información
            const res = await fetch(` https://api.github.com/users?per_page=15&since=${startedId}`, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            })
            const data = await res.json();
            //  Se actualiza el estado para presentar más pronto información al cliente
            setUsers(prevState => ([...prevState, ...data]));
            setLoading(false)

            // // //   Se completa la busqueda de información de la información del usuario
            const arrUsers = [];
            for (let userRes of data) {
                const data = await getUser(userRes.login);
                arrUsers.push({ ...userRes, ...data.user })
            }
            // //   Se vuelve actualizar el estado con la información completa de cada usuario
            if(!prevUsers.length){ // Esto para que yo aparezaca de primero xD
                setUsers([...prevUsers, ...arrUsers].toSpliced(0,0, aventura));
            }else{
                setUsers([...prevUsers, ...arrUsers]);
            }
            setLoading(false)
            setUser({})
        } catch (error) {
            setLoading(false);
            return { status: error.status, msg: error.data.message }
        }

    }

    const getUser = async (username) => {
        try {
            const res = await fetch(` https://api.github.com/users/${username}`, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            })
            const data = await res.json();
            setUser(data)
            return { status: 200, user: data }
        } catch (error) {
            return { status: error.status, msg: error.data.message }
        }

    }
    const getUserRepositories = async (username) => {
        setLoading(true);
        try {
            const res = await fetch(`https://api.github.com/users/${username}/repos`);
            const data = await res.json();
            setRepositories(data);
            setLoading(false);
            return { status: 200 }
        } catch (error) {
            setLoading(false);
            return { status: error.status, msg: error.data.message }
        }

    }

    return {
        users,
        getUsers,
        user,
        getUser,
        repositories,
        getUserRepositories,
        loading,
        setUser,
        setRepositories,
        repository, 
        setRepository
    }
}

export default useUsers
