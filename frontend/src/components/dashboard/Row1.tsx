//import BoxHeader from "../components/BoxHeader";
import DashboardBox from "./DashboardBox";
//import DataEntry from "@/components/DataEntry";
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import DataEntryBox from "./DataEntryBox";


type Props = {}

const Row1 = (props: Props) => {
    const { palette } = useTheme();
    const [dataEntries, setDataEntries] = useState([]);


    useEffect(() => {
      const fetchDataEntries = async () => {
        const response = await fetch("/api/dataEntries");
        const data = await response.json();
        const today = new Date().toLocaleDateString();
        const todaysEntry = data.filter((entry: any) => {
          const entryDate = new Date(entry.createdAt).toLocaleDateString();
          return entryDate === today;
        });
        setDataEntries(todaysEntry);
      };
      fetchDataEntries();
    }, []);
    
    
    return (
        <>
          <DashboardBox gridArea="a">
            <DataEntryBox />
          </DashboardBox>
          <DashboardBox gridArea="b"></DashboardBox>
          <DashboardBox gridArea="c"></DashboardBox>
        </>
    )
}

export default Row1;