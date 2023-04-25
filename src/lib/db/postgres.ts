// db.js
import postgres from 'postgres'

const options = {
  host: 'localhost',            // Postgres ip address[s] or domain name[s]
  port: 5432,          // Postgres server port[s]
  database: 'svelteapp',            // Name of database to connect to
  username: '',            // Username of database user
  password: '',
}
// 'postgres://@localhost:5432/svelteapp'
const sql = postgres(options) // will use psql environment variables

export default sql