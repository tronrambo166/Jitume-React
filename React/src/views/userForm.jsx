import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function UserForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUsers] = useState({
        id: null,
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/user/${id}`)
              .then(({data}) => {
                setLoading(false)
                setUsers(data)
                //console.log(data);
              })
              .catch(() => {
                setLoading(false)
              })
          }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (user.id) {
          axiosClient.put(`/update/${user.id}`, user)
            .then((data) => {
              console.log(data)
              navigate('/users')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
              console.log(err);
            })
        } else {
          axiosClient.post('/create', user)
            .then(() => {
              navigate('/users')
            })
            .catch(err => {
              console.log(err);
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
                console.log(err);
              }
            })
        }
      }

    return(
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={user.name} onChange={ev => setUsers({...user, name: ev.target.value})} placeholder="Name"/>
            <input value={user.email} onChange={ev => setUsers({...user, email: ev.target.value})} placeholder="Email"/>
            <input type="password" onChange={ev => setUsers({...user, password: ev.target.value})} placeholder="Password"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
    )
}