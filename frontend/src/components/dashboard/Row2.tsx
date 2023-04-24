import DashboardBox from "./DashboardBox"
import React from 'react'

type Props = {}

const Row2 = (props: Props) => {
    return (
        <>
        <DashboardBox gridArea="d"></DashboardBox>
        <DashboardBox gridArea="e"></DashboardBox>
        </>
    )
}

export default Row2;