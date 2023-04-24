import { Container } from "@mui/material";
import { User } from "../models/user";
import LoggedOutPage from "../components/LoggedOutPage";
import DashboardPage from "./DashboardPage";

interface HomePageProps {
    loggedInUser: User | null,
}

const HomePage = ({loggedInUser}: HomePageProps) => {
    return (
        <Container>
            <>
                { loggedInUser
                ? <DashboardPage />
                : <LoggedOutPage />
                }
            </>
      </Container>
    );
}

export default HomePage;