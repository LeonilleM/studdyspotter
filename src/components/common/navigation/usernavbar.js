import React, { useState, useEffect } from 'react'
import { fetchUserInfo } from '../../../services/profile/profileServices'


function UserNavbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await fetchUserInfo();
            setUser(userInfo);
        };
        getUserInfo();
    }, []);

    if (!user) {
        return null; // Or a loading spinner
    }
    return (
        <div className="absolute top-0 right-0 p-6 mr-4">
            <div className="flex flex-row items-center space-x-2" >
                <img className="w-10 h-10 rounded-full bg-gray-800" alt="User Avatar" />
                <div className="flex flex-col ont-encode-sans">
                    <p className="text-xl">{user.first_name} {user.last_name}</p>
                    <p className="text-primary"> {user.year} </p>
                </div>
            </div>

        </div >
    )
}

export default UserNavbar