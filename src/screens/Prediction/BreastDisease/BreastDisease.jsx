/*

  Breast Disease Prediction Model
  Submitted and Developed by: M. Moin Uddin Malik
  Enrollment Number:
  Course:
  Fall 2023

*/

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";

export const MOIN_API = "https://breast-disease-df4215585c3a.herokuapp.com";
const BASE_URL = 'https://e-react-node-backend-22ed6864d5f3.herokuapp.com';

function BreaseDisease() {
  const [open, setOpen] = useState("");
  const [result, setResult] = useState("");
  const [body, setBody] = useState(null)
  const location = useLocation();
  const patient_id = location.state.id;

  const [radiusMean, setRadiusMean] = useState("");
  const [textureMean, setTextureMean] = useState("");
  const [perimeterMean, setPerimeterMean] = useState("");
  const [areaMean, setAreaMean] = useState("");
  const [smoothnessMean, setSmoothnessMean] = useState("");
  const [compactnessMean, setCompactnessMean] = useState("");
  const [concavityMean, setConcavityMean] = useState("");
  const [concavePointsMean, setConcavePointsMean] = useState("");
  const [symmetryMean, setSymmetryMean] = useState("");
  const [fractalDimensionMean, setFractalDimensionMean] = useState("");
  const [radiusSe, setRadiusSe] = useState("");
  const [textureSe, setTextureSe] = useState("");
  const [perimeterSe, setPerimeterSe] = useState("");
  const [areaSe, setAreaSe] = useState("");
  const [smoothnessSe, setSmoothnessSe] = useState("");
  const [compactnessSe, setCompactnessSe] = useState("");
  const [concavitySe, setConcavitySe] = useState("");
  const [concavePointsSe, setConcavePointsSe] = useState("");
  const [symmetrySe, setSymmetrySe] = useState("");
  const [fractalDimensionSe, setFractalDimensionSe] = useState("");
  const [radiusWorst, setRadiusWorst] = useState("");
  const [textureWorst, setTextureWorst] = useState("");
  const [perimeterWorst, setPerimeterWorst] = useState("");
  const [areaWorst, setAreaWorst] = useState("");
  const [smoothnessWorst, setSmoothnessWorst] = useState("");
  const [compactnessWorst, setCompactnessWorst] = useState("");
  const [concavityWorst, setConcavityWorst] = useState("");
  const [concavePointsWorst, setConcavePointsWorst] = useState("");
  const [symmetryWorst, setSymmetryWorst] = useState("");
  const [fractalDimensionWorst, setFractalDimensionWorst] = useState("");

  function createData(name, value, defaultValue, onChange) {
    return { name, value, defaultValue, onChange };
  }

  const rows = [
    createData("Radius Mean", radiusMean, 17.99, setRadiusMean),
    createData("Texture Mean", textureMean, 10.38, setTextureMean),
    createData("Perimeter Mean", perimeterMean, 122.8, setPerimeterMean),
    createData("Area Mean", areaMean, 1001, setAreaMean),
    createData("Smoothness Mean", smoothnessMean, 0.1184, setSmoothnessMean),
    createData("Compactness Mean", compactnessMean, 0.2776, setCompactnessMean),
    createData("Concavity Mean", concavityMean, 0.3001, setConcavityMean),
    createData(
      "Concave Points Mean",
      concavePointsMean,
      0.1471,
      setConcavePointsMean
    ),
    createData("Symmetry Mean", symmetryMean, 0.2419, setSymmetryMean),
    createData(
      "Fractal Dimension Mean",
      fractalDimensionMean,
      0.07871,
      setFractalDimensionMean
    ),
    createData("Radius Se", radiusSe, 1.095, setRadiusSe),
    createData("Texture Se", textureSe, 0.9053, setTextureSe),
    createData("Perimeter Se", perimeterSe, 8.589, setPerimeterSe),
    createData("Area Se", areaSe, 153.4, setAreaSe),
    createData("Smoothness Se", smoothnessSe, 0.006399, setSmoothnessSe),
    createData("Compactness Se", compactnessSe, 0.04904, setCompactnessSe),
    createData("Concavity Se", concavitySe, 0.05373, setConcavitySe),
    createData(
      "Concave Points Se",
      concavePointsSe,
      0.01587,
      setConcavePointsSe
    ),
    createData("Symmetry Se", symmetrySe, 0.03003, setSymmetrySe),
    createData(
      "Fractal Dimension Se",
      fractalDimensionSe,
      0.006193,
      setFractalDimensionSe
    ),
    createData("Radius Worst", radiusWorst, 25.38, setRadiusWorst),
    createData("Texture Worst", textureWorst, 17.33, setTextureWorst),
    createData("Perimeter Worst", perimeterWorst, 184.6, setPerimeterWorst),
    createData("Area Worst", areaWorst, 2019, setAreaWorst),
    createData("Smoothness Worst", smoothnessWorst, 0.1622, setSmoothnessWorst),

    createData(
      "Compactness Worst",
      compactnessWorst,
      0.6656,
      setCompactnessWorst
    ),
    createData("Concavity Worst", concavityWorst, 0.7119, setConcavityWorst),
    createData(
      "Concave Points Worst",
      concavePointsWorst,
      0.2654,
      setConcavePointsWorst
    ),
    createData("Symmetry Worst", symmetryWorst, 0.4601, setSymmetryWorst),
    createData(
      "Fractal Dimension Worst",
      fractalDimensionWorst,
      0.1189,
      setFractalDimensionWorst
    ),
  ];

  const rawData = {
    radius_mean: radiusMean,
    texture_mean: textureMean,
    perimeter_mean: perimeterMean,
    area_mean: areaMean,
    smoothness_mean: smoothnessMean,
    compactness_mean: compactnessMean,
    concavity_mean: concavityMean,
    concave_points_mean: concavePointsMean,
    symmetry_mean: symmetryMean,
    fractal_dimension_mean: fractalDimensionMean,
    radius_se: radiusSe,
    texture_se: textureSe,
    perimeter_se: perimeterSe,
    area_se: areaSe,
    smoothness_se: smoothnessMean,
    compactness_se: compactnessSe,
    concavity_se: concavitySe,
    concave_points_se: concavePointsSe,
    symmetry_se: symmetrySe,
    fractal_dimension_se: fractalDimensionSe,
    radius_worst: radiusWorst,
    texture_worst: textureWorst,
    perimeter_worst: perimeterWorst,
    area_worst: areaWorst,
    smoothness_worst: smoothnessWorst,
    compactness_worst: compactnessWorst,
    concavity_worst: concavityWorst,
    concave_points_worst: concavePointsWorst,
    symmetry_worst: symmetryWorst,
    fractal_dimension_worst: fractalDimensionWorst,
  }
  

  useEffect(() => {
    setBody(rawData)
    rows.forEach((row) => {
      row.onChange(row.defaultValue);
    });
  }, []);

  const handleReset = () => {
    rows.forEach((row) => {
      row.onChange("");
    });
  };
  const handlePredict = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${MOIN_API}/breastDiseasePredict`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setResult(JSON.parse(result));
        setOpen(true);
      })
      .catch((error) => console.log("error", error));
  };

  const handlePatientData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "patient_id": patient_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch( `${BASE_URL}/getBreastCancerData`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const data = JSON.parse(result)
        console.log("Breast Data => ", {result: data})
        setBody({...body, ...data})
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    setTimeout(() => {
      handlePatientData()
    }, 500); // Data fetch debounce
  }, [])
  

  const handleClose = () => setOpen(false);




  return (
    <div className="breastDiseaseContainer">
      <TableContainer className="tableContainer">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    value={row.value}
                    // defaultValue={row.defaultValue}
                    onChange={(e) => row.onChange(e.target.value)}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} align="right">
                <div className="tableFooterButton">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePredict(rawData)}
                  >
                    Predict
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Result:</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TableBody>
              <TableRow>
                <TableCell align="right">Accuracy</TableCell>
                <TableCell align="right">{result.accuracy * 100}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Result</TableCell>
                <TableCell align="left">{result.output}</TableCell>
              </TableRow>
            </TableBody>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BreaseDisease;
