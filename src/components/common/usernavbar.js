import React from 'react'

function usernavbar() {
    return (
        <div className="absolute top-0 right-0 p-6 mr-4">
            <div className="flex flex-row items-center space-x-2" >
                <img className="w-10 h-10 rounded-full bg-gray-800" alt="User Avatar" />
                <div className="flex flex-col ont-encode-sans">

                    <p className="text-xl">first, last</p>

                    <p className="text-primary"> year</p>
                </div>
            </div>

        </div >
    )
}

export default usernavbar