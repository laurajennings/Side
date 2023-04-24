import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextInputField from "../components/form/TextInputField";
import { UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import * as DailyEntriesApi from "../network/dataEntries_api";
import { LoginCredentials } from "../network/dataEntries_api";

interface LoginProps {
    onLoginSuccessful: (user: User) => void,
}

const LoginPage = ({onLoginSuccessful}: LoginProps) => {
    
    const [errorText, setErrorText] = useState<string | null>(null);

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>();
    const navigate = useNavigate();
    const { palette } = useTheme();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await DailyEntriesApi.login(credentials);
            navigate("/dashboard");
            onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
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
                    Log In
                </Typography>
            {errorText &&
            <Alert variant="danger">
                {errorText}
            </Alert>
            }
            <Stack
                component="form" 
                onSubmit={handleSubmit(onSubmit)}
                >
                    <TextInputField 
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{required: "Reqquired"}}
                        error={errors.email}
                    />
                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{required: "Reqquired"}}
                        error={errors.password}
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
                        Log In
                    </Button>
                </Stack>
            </Box>
        </Container>
        );
}

export default LoginPage;