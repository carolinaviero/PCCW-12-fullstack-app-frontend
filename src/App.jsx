import { useEffect, useState } from 'react';
import User from './components/User';
import './App.css';

const App = () => {
  const [users, setUsers] = useState({});
  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    favorite_color: "",
    img_url: "",
  })

  const fetchUsers = () => {
    fetch('/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  const handleInputChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  const handleAddUser = () => {
    fetch("/users",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => setUsers([...users, data]))
   
    setNewUser({ name: "", age: "", favorite_color: "", img_url: ""})
  }

  const handleDelete = (id) => {
    fetch(`/users/${id}`,{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    const remainingUsers = users.filter(user => user._id !== id);
    setUsers(remainingUsers);
  }

  const handleUpdateUser = (id, editedInfo) => {
    fetch(`/users/${id}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedInfo)
    }) 
  }
 
  return (
    <div className="App">
      <h1>Greatest dogs ever</h1>
      <input placeholder="Name" name="name" onChange={handleInputChange} value={newUser.name}/>
      <input placeholder="Age" name="age" onChange={handleInputChange} value={newUser.age}/>
      <input placeholder="Favorite color" name="favorite_color" onChange={handleInputChange} value={newUser.favorite_color}/>
      <input placeholder="Image" name="img_url" onChange={handleInputChange} value={newUser.img_url}/>
      <button onClick={handleAddUser}>Submit</button>
      <div className="user-container">
        {users.length && users.map(user => <User user={user} key={user._id} handleDelete={handleDelete} handleUpdateUser={handleUpdateUser} />)}
      </div>
    </div>
  );
}

export default App;
