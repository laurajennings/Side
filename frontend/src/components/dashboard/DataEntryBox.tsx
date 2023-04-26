import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import styleUtils from "../../styles/utils.module.css";
import DataEntryModal from "../DataEntryModal"
import { DataEntry as DataEntryModel } from "../../models/dataEntry"
import * as DataEntriesApi from "../../network/dataEntries_api";


const DataEntryBox = () => {
    const [dataEntries, setDataEntries] = useState<DataEntryModel[]>([]);
    const [dataEntriesLoading, setDataEntriesLoading] = useState(true);
    const [showDataEntriesLoadingError, setShowDataEntriesLoadingError] = useState(false);

    const [showAddDataEntryDialog, setShowAddDataEntryDialog] = useState(false);
    //const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    useEffect(() => {
        async function loadDataEntries() {
            try {
                setShowDataEntriesLoadingError(false);
                setDataEntriesLoading(true);
                const dataEntries = await DataEntriesApi.fetchDataEntries();
                setDataEntries(dataEntries);
            } catch (error) {
                console.error(error);
                setShowDataEntriesLoadingError(true);
            } finally {
                setDataEntriesLoading(false);
            }
        }
        loadDataEntries();
    }, []);


    return (
        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddDataEntryDialog(true)}>
                Add new note
            </Button>

    {showAddDataEntryDialog &&
        <DataEntryModal
            onDismiss={() => setShowAddDataEntryDialog(false)}
            onDataEntrySaved={(newDataEntry) => {
                setDataEntries([...dataEntries, newDataEntry]);
                setShowAddDataEntryDialog(false);
            }} 
        />
    }
    </>
    )
}

export default DataEntryBox;