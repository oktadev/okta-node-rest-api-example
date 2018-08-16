const Sequelize = require('sequelize')
const epilogue = require('epilogue')

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite',
  operatorsAliases: false
})

const Part = database.define('parts', {
  partNumber: Sequelize.STRING,
  modelNumber: Sequelize.STRING,
  name: Sequelize.STRING,
  description: Sequelize.TEXT
})

const initializeDatabase = async (app) => {
  epilogue.initialize({ app, sequelize: database })

  epilogue.resource({
    model: Part,
    endpoints: ['/parts', '/parts/:id']
  })

  await database.sync()
}

module.exports = initializeDatabase
