const GoogleSpreadsheet = require("google-spreadsheet");

const postToSpreadsheet = data => {
  const spreadsheetKey = "1XX-8cH5piiW1N1khEDrzfNGRKBci1RFMqXOZ6KbRFXQ";
  return new Promise((resolve, reject) => {
    return addRow(spreadsheetKey, data, (err, data2) => {
      if (err) {
        return reject(err);
      }
      return resolve(data2);
    });
  });
};

function addRow(spreadsheetKey, data, cb) {
  const doc = new GoogleSpreadsheet(spreadsheetKey);
  let sheet;

  const creds = require("./creds.json");

  const values = {
    Date: new Date().toLocaleDateString(),
    Heure: new Date().toLocaleTimeString(),
    Team: data.team,
    Score: data.score,
    Email: data.emails
  };
  doc.useServiceAccountAuth(creds, () => {
    doc.getInfo(function(err, info) {
      console.log(info);
      console.log("Loaded doc: " + info.title + " by " + info.author.email);
      sheet = info.worksheets[0];
      console.log(
        "sheet 1: " + sheet.title + " " + sheet.rowCount + "x" + sheet.colCount
      );
      sheet.addRow(values, function(err, rows) {
        if (err) {
          console.log("err adding data", err);
          cb(err);
          throw err;
        }
        cb(null, data);
      });
    });
  });
}

module.exports = {
  postToSpreadsheet: postToSpreadsheet
};
