import React from 'react'

function sidenavbar() {
    return (
        <div>
            <aside className="fixed top-0 left-0 h-full w-80 bg-primary text-white md:flex flex-col font-light hidden">
                <div className="h-full pt-24 overflow-y-auto flex flex-col justify-between px-7">
                    <ul className="text-2xl space-y-2 font-open-sans">
                        <li className="flex items-center gap-4 pt-4 pb-4 px-3 hover:rounded-2xl hover:bg-secondary  transition ease-in-out duration-500">
                            Feed
                        </li>
                        <li className="flex items-center gap-4 pt-4 pb-4 px-3 hover:rounded-2xl hover:bg-secondary  transition ease-in-out duration-500">
                            Create
                        </li>

                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default sidenavbar