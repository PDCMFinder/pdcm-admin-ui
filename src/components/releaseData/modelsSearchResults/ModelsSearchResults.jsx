import { Alert, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

const ModelsSearchResults = ({ results, isLoading, onDataChanged }) => {

    const columns = [
        { internalName: "externalModelId", displayName: "external Model Id" },
        { internalName: "dataSource", displayName: "data Source" },
        { internalName: "projectName", displayName: "Projecy" },
        { internalName: "modelType", displayName: "type" },
        { internalName: "histology", displayName: "histology" },
        { internalName: "datasetAvailable", displayName: "datasetAvailable" },
        { internalName: "primarySite", displayName: "Primary Site" },
        { internalName: "collectionSite", displayName: "Collection Site" },
        { internalName: "tumourType", displayName: "Tumour Type" },
        { internalName: "patientAge", displayName: "Patient Age" },
        { internalName: "patientSex", displayName: "Patient Sex" },
        { internalName: "patientEthnicity", displayName: "Ethnicity" },
        { internalName: "patientEthnicityAssessmentMethod", displayName: "Ethnicity Assessment Method" },
        { internalName: "patientInitialDiagnosis", displayName: "Patient Initial Diagnosis" },
        { internalName: "patientTreatmentStatus", displayName: "Patient Treatment Status" },
        { internalName: "patientAgeAtInitialDiagnosis", displayName: "Patient Age At Initia Diagnosis" },
        { internalName: "patientSampleId", displayName: "Patient Sample Id" },
        { internalName: "patientSampleCollectionDate", displayName: "Patient Sample Collection Date" },
        { internalName: "patientSampleCollectionEvent", displayName: "Patient Sample Collection Event" },
        { internalName: "patientSampleMonthsSinceCollection1", displayName: "patient Sample Months Since Collection1" },
        { internalName: "patientSampleVirologyStatus", displayName: "Patient Sample VirologyStatus" },
        { internalName: "patientSampleTreatedAtCollection", displayName: "Patient Sample Treated At Collection" },
        { internalName: "patientSampleTreatedPriorToCollection", displayName: "Patient Sample Treated Prior To Collection" },
        { internalName: "pdxModelPublications", displayName: "Publications" },
        { internalName: "scores", displayName: "scores" },
    ];

    return (
        <div>
            {results.length === 0 && !isLoading && (
                <Alert severity="warning">
                    Your query/filter did not return any results
                </Alert>
            )}

            {isLoading && (
                <Box
                    sx={{
                        height: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress size={100} />
                </Box>
            )}

            {!isLoading && results.length > 0 && (

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell key={index}>{column.displayName}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((column, columnIndex) => (
                                        <TableCell key={columnIndex}>{row[column.internalName]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default ModelsSearchResults