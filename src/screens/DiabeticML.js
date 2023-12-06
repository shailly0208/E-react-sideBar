import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import  '../styles/screens/DiabeticML.css'
function DiabeticML() {
  const [diabetesData] = useState({
    "patient_id": 143,
    "pregs": 1,
    "gluc": 189,
    "bp": 60,
    "skin": 23,
    "insuli": 846,
    "bmi": 30.1,
    "fun": 0.398,
    "age": 59
  });
  const [diagnosis, setDiagnosis] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const location = useLocation();
  const patientIdFromLocation = location.state?.id; // Check if 'id' exists in location.state
  const [patientId, setPatientId] = useState(patientIdFromLocation);
  const [latestRecord, setLatestRecord] = useState();
  const [tableOfData, setTableOfData] = useState([]);

  useEffect(() => {
    // Fetch the latest record when the component mounts
    getPatientLatestRecord();
  }, [patientId]); // Include 'patientId' in the dependency array

  const getPatientLatestRecord = async () => {
    try {
      const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getDiabeticsData', {
        patientId
      });
      console.log("response",response);
      const { data } = response;
      if (data.error) {
        alert(JSON.stringify(data.error));
      } else if (!data || !data.data) {
        alert("Received wrong result from the server.");
      } else {
        setLatestRecord(data);
        setTableOfData(Object.values(data.data));
      }
    } catch (error) {
      console.log(`Error With request on patient records: ${error.message}`);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const predictDiabetes = async () => {
    if (!latestRecord) {
      alert("Please fetch the latest record first.");
      return;
    }

    const record = latestRecord.data ?? diabetesData;
    console.log("latest", record);
    try {
      const response = await axios.post('https://diabetes21-11017bdfad2d.herokuapp.com/submit', record, {
        headers: { 'Content-Type': 'application/json' },
      });

      const result = response.data;
      console.log("result:",result);
      if (response.status === 200) {
        if (result.error) {
          setAlertMessage(JSON.stringify(result.error));
        } else {
          setDiagnosis(result.message);
          setAlertMessage('Successfully stored in db');
          setShowAlert(true);
        }
      } else {
        setAlertMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setAlertMessage(`Error: ${error.message}`);
    } finally {
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="diabetic-container">
        <h2 className="title"> Diabetes Prediction</h2>
        {/* <button className="predict-button" onClick={getPatientLatestRecord}>Get Latest Record</button> */}
        <button className="predict-button" onClick={predictDiabetes}>Predict Diabetes</button><br></br><br></br>
        <div className="prediction-result">
          <strong>Diagnosis:</strong> {diagnosis}
        </div><br></br><br></br>
        <div className="data-table">
          <h3>Pateint Data</h3>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(diabetesData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showAlert && (
          <div className="alert">
            {alertMessage}
          </div>
        )}
      </div>
    </>
  );
}

export default DiabeticML;
