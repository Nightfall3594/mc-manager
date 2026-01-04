import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";


export default function SidebarLink({title, Icon, link} : {title: string, Icon: React.ElementType, link: string}) {
    return (
        <NavLink
            to={link}
            className={({ isActive }) =>
                `flex flex-row justify-start items-center p-3 w-full transition-all duration-250 ease-in-out relative
                    ${isActive
                        ? "font-bold rounded-r-3xl text-neutral-800 my-2 scale-110"
                        : "text-neutral-400 hover:bg-neutral-700 rounded-r-2xl"}`
            }
        >
            {({isActive}) => (
                <>
                    { isActive && (
                        <motion.div layoutId="nav-bg" className="w-[95%] h-full bg-neutral-300 absolute -z-10 rounded-r-2xl shadow-3xl"/>
                    )}

                    <Icon className={`w-6 h-6 mx-3 
                        ${isActive
                            ? "text-neutral-900"
                            : "text-neutral-500"}`
                     }/>
                    {title}
                </>
            )}
        </NavLink>
    )
}