export default config = {
    authentication: {
      options: {
        userName: "azureuser", // update me
        password: "Azure123!" // update me
      },
      type: "default"
    },
    server: "mysqlserver-3.database.windows.net", // update me
    options: {
      database: "Users", //update me
      encrypt: true
    }
  };