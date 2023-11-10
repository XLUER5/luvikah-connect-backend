import { Sequelize } from "sequelize";

const db =  new Sequelize("luvikah-app","admin","Luvikah.",{
    host: 'luvikah-app.cdvvaibuevei.us-east-2.rds.amazonaws.com',
    dialect: 'mysql'
})

export default db;