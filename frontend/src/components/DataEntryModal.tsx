import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Modal, RadioGroup, Slider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import TextInputField from "./form/TextInputField";
import { DataEntryInput } from "../network/dataEntries_api";
import { Controller, useForm, useFormState } from "react-hook-form";
import { DataEntry } from "../models/dataEntry";
import * as DataEntriesApi from "../network/dataEntries_api";
import { getValueFromValueOptions } from "@mui/x-data-grid/components/panel/filterPanel/filterPanelUtils";
import { setConstantValue } from "typescript";

interface DataEntryBoxProps {
    onDismiss: () => void,
    onDataEntrySaved: (dateEntry: DataEntry) => void,
}


const DataEntryModal = ({ onDismiss, onDataEntrySaved }: DataEntryBoxProps) => {

    const [showAddDataEntryDialog, setShowAddDataEntryDialog] = useState(false);
    const {control, register, handleSubmit, formState: {errors, isSubmitting}} = useForm<DataEntryInput>();
    const [errorText, setErrorText] = useState<string | null>(null);

    async function onSubmit(input: DataEntryInput) {
        console.log('submitting: ', input);
        try {
            const newDataEntry = await DataEntriesApi.createDataEntry(input);
            onDataEntrySaved(newDataEntry);
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
        console.log(newRadios);
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
        <>
            <Modal open={true} onClose={onDismiss}>
                <Box sx={{
                    position: "absolute", 
                    top: "50%", 
                    left: "50%", 
                    transform: "translate(-50%, -50%)", 
                    width: 400, bgcolor: "background.paper", 
                    borderRadius: "6px", 
                    boxShadow: 24, p: 4
                    }}
                    >
                    <Typography variant="h2" gutterBottom>
                        Add Entry
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} id="addEditDataEntryForm">
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Overall Feeling
                            </Typography>
                            <Slider
                                aria-label="Overall Feeling"
                                min={0}
                                max={10}
                                step={1}
                                name="overallFeeling"
                                onChange={(_, value) => register("overallFeeling", {
                                    value: Array.isArray(value) ? value[0] : value })}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Medications
                            </Typography>
                            <FormGroup>
                                {radios.map((radio, index) => (
                                    
                                    <div key={index} >
                                        <FormControlLabel
                                            control={
                                            <Controller
                                                
                                                name={`medications.${index}.name`}
                                                render={({ field }) => (
                                                    <Checkbox
                                                        {...field}
                                                        checked={radio.checked}
                                                        onChange={() => handleRadioChange(index)}
                                                        value={radio.label}
                                                    />
                                            
                                                )}
                                                
                                                control={control}
                                            /> 
                                            }
                                            label={radio.label}
                                        />
                                        <TextInputField 
                                            name={`medications.[${index}].dose`}
                                            label="Dose"
                                            type="text"
                                            placeholder="Dose"
                                            register={register}
                                            registerOptions={{required: "Required"}}
                                        />
                                        <Button onClick={() => handleRemoveRadio(index)}>Remove</Button>
                                    </div>
                                ))}
                                
                                <TextField
                                    sx={{ width: "70%", mr: 1 }}
                                    value={newRadioLabel}
                                    onChange={handleNewRadioLabel}
                                    placeholder="Medication Name"
                                />
                                <Button variant="contained" onClick={handleAddRadio}>
                                    Add
                                </Button>
                            </FormGroup>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Water Intake
                            </Typography>
                            <Slider
                                aria-label="Water Intake"
                                min={0}
                                max={10}
                                step={1}
                                name="waterIntake"
                                onChange={(_, value) => register("waterIntake", {
                                    value: Array.isArray(value) ? value[0] : value })}
                                
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Sleep
                            </Typography>
                            <Slider
                                aria-label="Sleep"
                                min={0}
                                max={10}
                                step={1}
                                name="sleep"
                                onChange={(_, value) => register("sleep", {
                                    value: Array.isArray(value) ? value[0] : value })}
                                
                            />
                        </Box>
                    
                    <Box>
                        <Button
                        type="submit"
                        id="dataEntryForm"
                        disabled={isSubmitting}
                        >
                        Save
                        </Button>
                    </Box>
                </Box>
                </Box>
            </Modal>

        </>
    )
}

export default DataEntryModal;