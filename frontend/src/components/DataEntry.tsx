import styles from '../styles/DataEntry.module.css';
import styleUtils from '../styles/utils.module.css';
import {Card} from 'react-bootstrap';
import {DataEntry as DataEntryModel} from '../models/dataEntry';
import {formatDate} from '../utils/formatDate';
import {MdDelete} from "react-icons/md";

interface DataEntryProps {
    dataEntry: DataEntryModel,
    onDataEntryClicked: (dataEntry: DataEntryModel) => void,
    onDeleteDataEntryClicked: (dataEntry: DataEntryModel) => void,
    className?: string,
}

const DataEntry = ({dataEntry, onDataEntryClicked, onDeleteDataEntryClicked, className}: DataEntryProps) => {
    const {
        overallFeeling,
        pillTaken,
        waterIntake,
        sleep,
        createdAt,
        //updatedAt,
    } = dataEntry;

let createdAtText = formatDate(createdAt);

    return (
        <Card className={`${styles.dataEntryCard} ${className}`}
        onClick={() => onDataEntryClicked(dataEntry)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {createdAtText}
                    <MdDelete
                        className="ms-auto"
                        onClick={(e) => {
                            onDeleteDataEntryClicked(dataEntry);
                            e.stopPropagation();
                        }} 
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>{overallFeeling}</Card.Text>
                <Card.Text className={styles.cardText}>{pillTaken}</Card.Text>
                <Card.Text className={styles.cardText}>{waterIntake}</Card.Text>
                <Card.Text className={styles.cardText}>{sleep}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default DataEntry;