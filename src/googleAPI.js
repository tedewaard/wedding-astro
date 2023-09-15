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

const spreadsheetId = '1VoJRjviLA7ZTrTZyHPXoWZ7xuLmFId7faBpYl6GE7O4';

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: 'Class Data!A2:E',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
  console.log('Name, Major:');
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[4]}`);
  });
}


async function readWedding(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
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
    spreadsheetId: spreadsheetId,
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
    entries.push({Name: row[0], Family_ID: row[1], RSVP_Sent: row[2], RSVP_Status: row[3], Updated: row[4],
    Song: row[5], Food_Pref: row[6]});
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
    spreadsheetId: spreadsheetId,
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
    spreadsheetId: spreadsheetId,
    range: 'A139',
    valueInputOption: 'RAW',
    resource,
  });
  //console.log(res);
}

function findPerson(name, data) {
  for (let i=0; i<data.length; i++) {
   if (data[i].Name == name) {
    //console.log(data[i]);
    let family = findFamily(data[i].Family_ID);
    console.log(family);
    return family;
   } 
  };
}

//TODO - This will also print the original person
//Should return an array of family, not print
function findFamily(id) {
  let family = [];
  for (let i=0; i<data.length; i++) {
   if (data[i].Family_ID == id) {
    //console.log(data[i]);
    family.push(data[i])
   } 
  };
  return family;
}

//data is an array of objects
var data = await authorize().then(readAllWedding).catch(console.error);

findPerson('Tanner Edewaard', data)