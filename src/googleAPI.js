import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import {authenticate} from '@google-cloud/local-auth';
import {google} from 'googleapis';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const SERVICE_ACCOUNT_FILE = path.join(process.cwd(), 'authKey.json');
const SPREADSHEETID = '1VoJRjviLA7ZTrTZyHPXoWZ7xuLmFId7faBpYl6GE7O4';

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  const client = new google.auth.GoogleAuth({
    scopes: SCOPES,
    keyFile: SERVICE_ACCOUNT_FILE,
  });
  return client;
}

async function readWedding_range_test(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEETID,
    range: 'A1:C5',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[1]}, ${row[2]}`);
  });
}

async function readAllWedding(auth) {
  const entries = [];
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEETID,
    range: 'Sheet1',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
  //console.log(rows.length)
  rows.forEach((row) => {
    //console.log(row);
    entries.push({ID: row[0], Name: row[1], Family_ID: row[2], RSVP_Sent: row[3], RSVP_Status: row[4], Updated: row[5],
    Song: row[6], Food_Pref: row[7]});
  });
  //console.log(entries);
  return entries
}

/**
 * 
 * @param {google.auth.OAuth2} auth 
 * @param {Array<Array<string>>} values 
 * @param {string} row 
 */
async function updateRow(auth, values, row) {
  const sheets = google.sheets({version: 'v4', auth});
  //let values = [['Tanner', 'Yes', 'Yup']];
  let resource = {
    values,
  };
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEETID,
    range: row,
    valueInputOption: 'RAW',
    resource,
  });
}

async function testUpdateRow(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  let values = [['Tanner', '', 'Yup', '', 'test']];
  let resource = {
    values,
  };
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEETID,
    range: 'A139',
    valueInputOption: 'RAW',
    resource,
  });
  //console.log(res);
}

async function findPerson(name) {
  const data = await authorize().then(readAllWedding).catch(console.error);
  for (let i=0; i<data.length; i++) {
   if (data[i].Name == name) {
    //console.log(data[i]);
    let family = findFamily(data[i].Family_ID, data);
    //console.log(family);
    return family;
   } 
  };
}

function findFamily(id, data) {
  let family = [];
  for (let i=0; i<data.length; i++) {
   if (data[i].Family_ID == id) {
    //console.log(data[i]);
    family.push(data[i])
   } 
  };
  return family;
}

function userToArray(userObj) {
  const keys = Object.keys(userObj);
  const values = keys.map(key => userObj[key]);
}

//TODO: Test this function . Create object on frontend and pass it in
async function updateRSVP(userObj) {
  const auth = authorize();
  const sheets = google.sheets({version: 'v4', auth});
  let range = "A" + userObj.ID;
  let vals = userToArray(userObj);
  let values = [vals];
  let resource = {
    values,
  };
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEETID,
    range: range,
    valueInputOption: 'RAW',
    resource,
  });
};
//var data = await authorize().then(readAllWedding).catch(console.error);
//findPerson('Tanner Edewaard', data)

export{findPerson};
export{updateRSVP};