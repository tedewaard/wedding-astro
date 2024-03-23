import path from 'path';
import process from 'process';
import {google} from 'googleapis';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const SERVICE_ACCOUNT_FILE = path.join(process.cwd(), 'authKey.json');
const SPREADSHEETID = '1VoJRjviLA7ZTrTZyHPXoWZ7xuLmFId7faBpYl6GE7O4';

//Lambda Handler
export const handler = async (event) => {
  const badResponse = {
    statusCode: 400,
    body: JSON.stringify('Bad Request'),
  }


  const query = event.queryStringParameters;
  const body = event.body;
  if (query) {

    const family = await findPerson(query.name);
    if (family){
      const body = JSON.stringify(family);
      const response = {
        statusCode: 200,
        body: body,
      };
      return response;
    } else {
      return badResponse
    }

    //If we are sending data (RSVP) to the lambda 
    } else if (body) {
      //data will be an array of guest rsvp
      const data = JSON.parse(body);
      //Update the google sheet using our data
      let updateRSVP = await parseRSVP(data);  
      const response = {
        statusCode: 200,
        body: JSON.stringify(updateRSVP),
      };
      return response;
    } else {
      return badResponse;
    }
}


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


async function parseRSVP(data) {
  const client = await authorize()
  for(let i=0; i<data.length; i++) {
    let parsedData = []
    //Grab values of object and add them to array
    let vals = Object.values(data[i]);
    let id = parseInt(vals[0]); //Converting Row ID to int
    let fam = parseInt(vals[2]); //Converting family ID to int
    vals[0] = id;
    vals[2] = fam;
    parsedData.push(vals);
    //Call update row passing in what is needed
    let range = "A" + vals[0]
    let response = await updateRow(client, parsedData, range)
    console.log(response.status);
    if (response.status != 200) {
      return "Error updating RSVP"
    }
  }
  return "RSVPs Updated"
}

async function updateRow(auth, values, row) {
  const sheets = google.sheets({version: 'v4', auth});
  //let values = [['Tanner', 'Yes', 'Yup']];
  let resource = {
    values,
  };
  const res = sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEETID,
    range: row,
    valueInputOption: 'RAW',
    resource,
  });
  return res;
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
    console.log(data[i]);
    let family = findFamily(data[i].Family_ID, data);
    console.log(family);
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

//var data = await authorize().then(readAllWedding).catch(console.error);
//await findPerson('Tanner Edewaard', data)

//export{findPerson};
//export{updateRSVP};

/*
const exampleBody = [
  {
    ID: "137",
    Name: "Liza Lohman",
    Family_ID: "78",
    RSVP_Sent: "Yes",
    RSVP_Status: "Yes",
    Updated: "True",
    Song: "NA",
    Food_Pref: "Vege",
  },
  {
    ID: "138",
    Name: "Liam Terry",
    Family_ID: "79",
    RSVP_Sent: "Yes",
    RSVP_Status: "Yes",
    Updated: "True",
    Song: "NA",
    Food_Pref: "Veganasdf",
  },
]; 

let testParse = await parseRSVP(exampleBody);
*/