interface Medication {
    name: string,
    dose: number,
}

export interface DataEntry {
    _id: string,
    overallFeeling?: number,
    medications?: Medication[],
    waterIntake?: number,
    sleep?: number,
    createdAt: string,
    updatedAt: string,
}