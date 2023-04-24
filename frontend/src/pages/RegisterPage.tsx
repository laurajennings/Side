import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextInputField from "../components/form/TextInputField";
import { ConflictError } from "../errors/http_errors";
import { User } from "../models/user";
import * as DailyEntriesApi from "../network/dataEntries_api";
import { RegisterCredentials } from "../network/dataEntries_api";

interface RegisterProps {
    onRegisterSuccessful: (user: User) => void,
}

const RegisterPage = ({onRegisterSuccessful}: RegisterProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterCredentials>();
    const navigate = useNavigate();
    const { palette } = useTheme();

    async function onSubmit(credentials: RegisterCredentials) {
        try {
            const newUser = await DailyEntriesApi.register(credentials);
            navigate("/dashboard");
            onRegisterSuccessful(newUser);
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
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Register
                </Typography>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}    
                    </Alert>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    sx={{
                        backgroundColor: palette.primary[700],
                        color: 'white',
                        m: 4,
                        height: '3rem',
                        width: '30%',
                        '&:hover': {
                            backgroundColor: palette.primary[500],
                        },
                    }}
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default RegisterPage;