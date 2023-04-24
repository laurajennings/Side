import { ConflictError, UnauthorizedError } from '../errors/http_errors';
import { DataEntry } from '../models/dataEntry';
import { User } from '../models/user';

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage)
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", {method: "GET"});
    return response.json();
}

export interface RegisterCredentials {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export async function register(credentials: RegisterCredentials): Promise<User> {
    const response = await fetchData("/api/users/register",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface LoginCredentials {
    email: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", {method: "POST"});
}

export async function fetchDataEntries(): Promise<DataEntry[]> {
    const response = await fetchData("/api/dataEntries", {method: "GET"});
    return response.json();
}

export interface DataEntryInput {
    overallFeeling: number,
    pillTaken: string,
    waterIntake: number,
    foodIntake: string,
    sleep: number,
    positiveEffects: string,
    negativeEffects: string,
}

export async function createDataEntry(dataEntry: DataEntryInput): Promise<DataEntry> {
    const response = await fetchData('/api/dataEntries', 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(dataEntry),
    });
    return response.json();
}

export async function updateDataEntry(dataEntryId: string, dataEntry: DataEntryInput): Promise<DataEntry> {
    const response = await fetchData("/api/dataEntries/" + dataEntryId,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataEntry),
    });
    return response.json();
}

export async function deleteDataEntry(dataEntryId: string){
    await fetchData('/api/dataEntries/' + dataEntryId, {method: "DELETE"});
}