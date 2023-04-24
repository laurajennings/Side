import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { DataEntry as DataEntryModel } from "../models/dataEntry";
import * as DataEntriesApi from "../network/dataEntries_api";
import AddEditDataEntryDialog from "./AddEditDataEntryDialog";
import DataEntry from "./DataEntry";
import styles from "../styles/DataEntriesPage.module.css";
import styleUtils from "../styles/utils.module.css";

const EntriesPage = () => {

    const [dataEntries, setDataEntries] = useState<DataEntryModel[]>([]);
    const [dataEntriesLoading, setDataEntriesLoading] = useState(true);
    const [showDataEntriesLoadingError, setShowDataEntriesLoadingError] = useState(false);
  
    const [showAddDataEntryDialog, setShowAddDataEntryDialog] = useState(false);
    const [dataEntryToEdit, setDataEntryToEdit] = useState<DataEntryModel|null>(null);

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
    
      async function deleteDataEntry(dataEntry: DataEntryModel) {
        try {
          await DataEntriesApi.deleteDataEntry(dataEntry._id);
          setDataEntries(dataEntries.filter(existingDataEntry => existingDataEntry._id !== dataEntry._id ));
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }
    
      const dataEntriesGrid = 
      <Row xs={1} md={2} xl={3} className={`g-4 ${styles.dialyEntriesGrid}`}>
        {dataEntries.map(dataEntry => (
          <Col key={dataEntry._id}>
            <DataEntry 
              dataEntry={dataEntry} 
              className={styles.dataEntry}
              onDataEntryClicked={setDataEntryToEdit}
              onDeleteDataEntryClicked={deleteDataEntry}
            />
          </Col>
        ))}
      </Row>

    return (
        <>
        <Button 
        className={`mb-4 ${styleUtils.blockCenter}`}
        onClick={() => setShowAddDataEntryDialog(true)}>
        Add new entry
      </Button>
      {dataEntriesLoading && <Spinner animation='border' variant='primary' />}
      {showDataEntriesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
      {!dataEntriesLoading && !showDataEntriesLoadingError &&
      <>
      {
        dataEntries.length > 0
        ? dataEntriesGrid
        :<p>You don't have any entries yet.</p>
      }
      </>}
      {showAddDataEntryDialog && 
        <AddEditDataEntryDialog
          onDismiss={() => setShowAddDataEntryDialog(false)}
          onDataEntrySaved={(newDataEntry) => {
            setDataEntries([...dataEntries, newDataEntry]);
            setShowAddDataEntryDialog(false);
          }}
        />
      }
      {dataEntryToEdit &&
      <AddEditDataEntryDialog
      dataEntryToEdit={dataEntryToEdit}
      onDismiss={() => setDataEntryToEdit(null)}
      onDataEntrySaved={(updatedDataEntry) => {
        setDataEntries(dataEntries.map(existingDataEntry => existingDataEntry._id === updatedDataEntry._id ? updatedDataEntry : existingDataEntry));
        setDataEntryToEdit(null);
      }}
      />
    }
        </>
    )
}

export default EntriesPage;