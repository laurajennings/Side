import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as DailyEntriesApi from "../network/dataEntries_api";

interface NavBarLoggedInProps {
    user: User,
    onUserClicked: () => void,
    onLogoutSuccessfull: () => void,
}

const NavBarLoggedIn = ({user, onUserClicked, onLogoutSuccessfull}: NavBarLoggedInProps) => {

    async function logout() {
        try {
            await DailyEntriesApi.logout();
            onLogoutSuccessfull();
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
        <Button className="me-2" onClick={onUserClicked}>
            {user.firstName} {user.lastName}
        </Button>
        <Button onClick={logout}>Log out</Button>
        </>
    );

}

export default NavBarLoggedIn;