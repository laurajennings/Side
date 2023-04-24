import { useForm } from "react-hook-form";
import {User} from "../models/user";
import { RegisterCredentials } from "../network/dataEntries_api";
import * as DataEntriesApi from "../network/dataEntries_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";

interface EditUserModalProps {
    userToEdit?: User,
    onDismiss: () => void,
    onUserSaved: (user: User) => void,
}

const EditUserModal = ({userToEdit, onDismiss, onUserSaved}: EditUserModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterCredentials>({
    defaultValues: {
        email: userToEdit?.email || "",
        firstName: userToEdit?.firstName || "",
        lastName: userToEdit?.lastName || "",
    }
});

    async function onSubmit(credentials: RegisterCredentials) {
        try {
            const newUser = await DataEntriesApi.register(credentials);
            onUserSaved(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Update Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}    
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.email}
                    />
                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />
                    <TextInputField 
                        name="firstName"
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.firstName}
                    />
                    <TextInputField 
                        name="lastName"
                        label="Last Name"
                        type="text"
                        placeholder="Last Name"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.lastName}
                    />
                    <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={styleUtils.width100}
                    >
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditUserModal;