import React, { useState } from 'react';
import axios from 'axios';

function DiabeticML() {
  const [diabetesData, setDiabetesData] = useState({
    "patient_id": 143,
    "pregs": 1,
    "gluc": 189,
    "bp": 60,
    "skin": 23,
    "insulin": 846,
    "bmi": 30.1,
    "func": 0.398,
    "age": 59
  });
  const [diagnosis, setDiagnosis] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const predictDiabetes = async () => {
    try {
      const response = await axios.post('https://diabetes21-11017bdfad2d.herokuapp.com/', diabetesData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = response.data;
  
      if (response.status === 200) {
        if (result.error) {
          setAlertMessage(JSON.stringify(result.error));
        } else {
          setDiagnosis(result);
          setAlertMessage('Successfully received prediction');
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
        <button className="predict-button" onClick={predictDiabetes}>Predict Diabetes</button>
        <div className="prediction-result">
          <strong>Diagnosis:</strong> {diagnosis}
        </div>
        <div className="data-table">
          <h3>Data Sent to API</h3>
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
