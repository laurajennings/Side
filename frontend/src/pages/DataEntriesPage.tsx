import { Container } from "react-bootstrap";
import { User } from "../models/user";
import EntriesPage from "../components/EntriesPage";
import LoggedOutPage from "../components/LoggedOutPage";
import styles from "../styles/DataEntriesPage.module.css";

interface DataEntriesPageProps {
    loggedInUser: User | null,
}

const DataEntriesPage = ({loggedInUser}: DataEntriesPageProps) => {
    return (
        <Container className={styles.dataEntriesPage}>
            <>
                { loggedInUser
                ? <EntriesPage />
                : <LoggedOutPage />
                }
            </>
      </Container>
    );
}

export default DataEntriesPage;