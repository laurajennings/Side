import { TextField, useTheme } from "@mui/material";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

export const TextInputField = ({name, label, register, registerOptions, error, ...props} : TextInputFieldProps) => {
    const { palette } = useTheme();
    return (
            <TextField 
                id="outlined-basic" 
                variant="outlined"
                
                    {...props}
                    {...register(name, registerOptions)}
                    label={label}
                    error={!!error}
                    helperText={error?.message}
                    sx={{
                        m: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: palette.grey[100],
                            },
                            '&:hover fieldset': {
                                borderColor: palette.grey[100],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: palette.grey[100],
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: palette.grey[100],
                        },
                        '& .MuiInputBase-root': {
                            color: palette.grey[100],
                        },
                    }}
                //isInvalid={!!error}
            />
/* {            <Form.Control.FeedBack type="invalid">
                {error?.message}
            </Form.Control.FeedBack> }*/
    );
}

export default TextInputField;