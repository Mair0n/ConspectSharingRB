import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log("Registered")
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const emailConfirm = (token) => {
    return axios
        .get('http://localhost:3000/users/confirmation/'+token)
        .then(res => {
            if (res) {
                console.log("Registered")
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const conspectAdd = conspect => {
    return axios
        .post('users/conspectAdd', {
            title: conspect.title,
            description: conspect.description,
            depNumber: conspect.depNumber,
            body: conspect.body,
            user: conspect.user
        })
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

export const getConspectsForHome = () => {
    return axios
        .post('users/home')
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getConspectInfo = (id) => {
    return axios
        .post('http://localhost:3000/users/conspect/'+id)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

export const getUserConspects = (userid) => {
    return axios
        .post('http://localhost:3000/users/profile', {
            id : userid
        })
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteUserConspect = (conspectsToDelete) => {
    return axios
        .post('http://localhost:3000/users/deleteUserConspects', {
            conspect : conspectsToDelete
        })
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

export const searchConspects = (q) => {
    return axios
    .get('http://localhost:3000/users/search/'+q)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}


