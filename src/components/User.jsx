import { useState } from "react";

const User = ({ user, handleDelete, handleUpdateUser }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedInfo, setEditedInfo] = useState(user);

    const handleInputChange = (event) => {
        setEditedInfo({ ...editedInfo, [event.target.name]: event.target.value })
      };

    const handleSaveEdit = () => {
        setIsEditMode(!isEditMode);
        isEditMode && handleUpdateUser(user._id, editedInfo)
    };
    

    return (
        <div className="user-card">
            {isEditMode ? 
                <>
                    <input placeholder="Name" onChange={handleInputChange} name="name" value={editedInfo.name}/>
                    <input placeholder="Age" onChange={handleInputChange} name="age" value={editedInfo.age}/>
                    <input placeholder="Image" onChange={handleInputChange} name="img_url" value={editedInfo.img_url}/>
                </>
                :
                <>
                    <img src={editedInfo.img_url} alt="picture of user" width="200" />
                    <h3>Name: {editedInfo.name}</h3>
                    <h3>Age: {editedInfo.age}</h3>
                </>
            }
            <button onClick={() => handleDelete(user._id)}>Adopted!</button>
            <button onClick={() => handleSaveEdit()}>{isEditMode ? 'Save' : 'Edit info'}</button>
        </div>
    );
};

export default User;