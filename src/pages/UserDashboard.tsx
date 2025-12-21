
import type {User} from "../types/user.ts";

export default function UserDashboard({currentUser}: {currentUser: User}) {

    return (
        <>
            <h1>{currentUser.name}</h1>
        </>
    )
}