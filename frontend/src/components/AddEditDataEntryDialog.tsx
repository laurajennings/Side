import React, {useState} from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import {DataEntry} from '../models/dataEntry';
import {DataEntryInput} from '../network/dataEntries_api';
import * as DataEntriesApi from '../network/dataEntries_api';
import TextInputField from './form/TextInputField';

interface AddEditDataEntryDialogProps {
    dataEntryToEdit?: DataEntry,
    onDismiss: () => void,
    onDataEntrySaved: (dataEntry: DataEntry) => void,
}



const AddEditDataEntryDialog = ({dataEntryToEdit, onDismiss, onDataEntrySaved}: AddEditDataEntryDialogProps) => {

    const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<DataEntryInput>({
        defaultValues: {
            overallFeeling: dataEntryToEdit?.overallFeeling || undefined,
            pillTaken: dataEntryToEdit?.pillTaken || "",
            waterIntake: dataEntryToEdit?.waterIntake || undefined,
            sleep: dataEntryToEdit?.sleep || undefined,
        }
    });
    async function onSubmit(input: DataEntryInput) {
        try {
            let dataEntryResponse: DataEntry;
            if (dataEntryToEdit) {
                dataEntryResponse = await DataEntriesApi.updateDataEntry(dataEntryToEdit._id, input);
            } else {
                dataEntryResponse = await DataEntriesApi.createDataEntry(input);
            }
            onDataEntrySaved(dataEntryResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
        const [radios, setRadios] = useState([
            {label: '', checked: false},
        ])
        const [newRadioLabel, setNewRadioLabel] = useState('');
    
        const handleRadioChange = (index: number) => {
            const newRadios = [...radios];
            newRadios[index].checked = !newRadios[index].checked;
            setRadios(newRadios);
        };
        const handleNewRadioLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewRadioLabel(event.target.value);
        };
        const handleAddRadio = () => {
            const newRadios = [
                ...radios,
                {label: newRadioLabel, checked: false},
            ];
            setRadios(newRadios);
            setNewRadioLabel('');
        };
        const handleRemoveRadio = (index: number) => {
            const newRadios = [...radios];
            newRadios.splice(index, 1);
            setRadios(newRadios);
        }
    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {dataEntryToEdit ? "Edit entry" : "Add entry"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditDataEntryForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Overall Feeling</Form.Label>
                        <Form.Range 
                            min={0}
                            max={10}
                            {...register("overallFeeling")}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pills Taken</Form.Label>
                        {radios.map((radio, index) => (
                            <div key={index} className="d-flex align-items-center">
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={radio.label}
                                checked={radio.checked}
                                onChange={() => handleRadioChange(index)}
                                //{...register("pillTaken")}
                            />
                            <Button variant="outline-danger" size="sm" onClick={() => handleRemoveRadio(index)}>Remove</Button>
                            </div>
                        ))}
                        <Form.Control
                            type="text"
                            placeholder="Medication Name"
                            value={newRadioLabel}
                            onChange={handleNewRadioLabel}
                        />
                        <Button onClick={handleAddRadio}>Add</Button>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Water Intake</Form.Label>
                        <Form.Range />
                    </Form.Group>
                    <TextInputField
                    name="foodIntake"
                    label="Food Intake"
                    //type="text"
                    as="textarea"
                    rows={3}
                    placeholder="What did you eat today?"
                    register={register}
                    //registerOptions={{required: "Required"}}
                    //error={errors.title}
                    />
                    <Form.Group className="mb-3">
                    <Form.Label>Sleep</Form.Label>
                        <Form.Range />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditDataEntryForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default AddEditDataEntryDialog;