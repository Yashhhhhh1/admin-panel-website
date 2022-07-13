import { useState } from "react";
import { connect } from "react-redux";
import style from "./Account.module.css";


const Account = ({ updateUserName }) => {
    const [username, setUsername] = useState("");

    const submitProfile = (e) => {
        e.preventDefault();
        if(e.nativeEvent.submitter.textContent.trim() === "UPDATE YOUR PROFILE"){
            if(username){
                updateUserName(username);
                localStorage.setItem("UserName", JSON.stringify(username));
                setUsername("");
                alert("Profile Successully Updated!!");
            }else{
                alert("Please enter details to update.")
            }
        }else{
            updateUserName("");
            localStorage.setItem("UserName", JSON.stringify(""));
            alert("Profile Successully Deleted!!");
        }
    }

    return (
        <>
            <form id={style.accTypesContainer}>
                <h3>List of Accounts</h3>
                <h4>Accounts</h4>
                <div>
                    <select required>
                        <option value="" hidden>Select account</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Merchant">Merchant</option>
                        <option value="Customer">Customer</option>
                    </select>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
            </form>

            <div id={style.userDetailsContainer}>
                <div id={style.avatarOption}>
                    <h3>Change Avatar</h3>
                    <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt="Profile pic" />
                    <div>
                        <input id={style.uploadImg} type="file" accept="image/*" />
                        <button>UPLOAD NEW PHOTO</button>
                    </div>
                </div>
                
                
                <div id={style.userDetails}>
                    <h3>Account Settings</h3>
                    <form onSubmit={(e) => { submitProfile(e) }}>
                        <div>
                            <label>Account Name</label>
                            <input onChange={(e)=>setUsername(e.target.value)} type="text" value={username} />
                        </div>
                        <div>
                            <label>Account Email</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" />
                        </div>
                        <div>
                            <label>Re-enter Password</label>
                            <input type="password" />
                        </div>
                        <div>
                            <label>Phone</label> <br></br>
                            <input type="number" />
                        </div>
                        <button id={style.updateProfileBtn}>UPDATE YOUR PROFILE</button>
                        <button id={style.deleteProfileBtn}>DELETE YOUR PROFILE</button>
                    </form>
                </div>
            </div>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        data: state.fetchReducer,
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateUserName : (name) => { dispatch({type : "UPDATE_USER_NAME", payload : name})},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);