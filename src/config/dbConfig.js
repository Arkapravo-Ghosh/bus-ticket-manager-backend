const sqlConfig = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWD,
  database: process.env.SQL_DB,
  port: process.env.SQL_PORT || 3306,
  connectTimeout: process.env.SQL_TIMEOUT || 100000,
};

export default sqlConfig;