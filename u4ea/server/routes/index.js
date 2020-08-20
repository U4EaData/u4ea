const { Connection, Request } = require("tedious");


const config = {
    authentication: {
      options: {
        userName: "azureuser", // update me
        password: "Azure123!" // update me
      },
      type: "default"
    },
    server: "mysqlserver-3.database.windows.net", // update me
    options: {
      rowCollectionOnDone: true,
      database: "Users", //update me
      encrypt: true
    }
}

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(doesUserExist("andrewboden"));
  }
});

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT * FROM login;`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
}

function doesUserExist(userName) {
  const request = new Request(
    'SELECT * FROM login WHERE LoginName = \'' + userName + '\';',
    (err, rowCount, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(rowCount > 0);
      }
    }
  );

  request.on('doneInProc', "row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
  console.log("after:" );
}