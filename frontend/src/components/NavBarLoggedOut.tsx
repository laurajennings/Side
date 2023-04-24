import { Button } from "react-bootstrap"

interface NavBarLoggedOutProps {
    onRegisterClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOut = ({onRegisterClicked, onLoginClicked}: NavBarLoggedOutProps) => {
    return (
        <>
            <Button onClick={onRegisterClicked}>Register</Button>
            <Button onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOut;