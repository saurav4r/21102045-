const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const companies = [];

app.post('/test/register', (req, res) => {
  const { companyName,ownerName,rollNo,ownerEmail,accessCode } = req.body;
  const clientID=generateUniqueID();
  const clientSecret=generateClientSecret();
  const company={
    companyName,
    ownerName,
    rollNo,
    ownerEmail,
    accessCode,
    clientID,
    clientSecret,
  };

  companies.push(company);

  res.json({
    companyName,
    clientID,
    clientSecret,
    ownerName,
    ownerEmail,
    rollNo: '1',
  });
});

app.post('/test/auth',(req,res) => {
  const { companyName,clientID,clientSecret,ownerName,ownerEmail,rolINo }=req.body;

  const company=companies.find(
    (company)=>company.companyName === companyName && company.clientID === clientID
  );


  if (!company||company.clientSecret!==clientSecret) {
    return res.status(401).json({ error:'Invalid credentials'});
  }

  
  const token = jwt.sign({companyName,clientID},'your-secret-key',{ expiresIn:'1h'});

  res.json({
    token_type: 'Bearer',
    access_token: token,
    expires_in: 3600, 
  });
});


function generateUniqueID() {
  return uuid.v4();
}

function generateClientSecret() {
  return crypto.randomBytes(16).toString('hex');
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});