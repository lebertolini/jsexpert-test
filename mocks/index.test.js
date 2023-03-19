const { error } = require('./src/constants')
const File = require('./src/file.js')
const { rejects, deepStrictEqual } = require('assert')

;(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        id: 123,
        name: 'Luiz Eduardo',
        profession: 'Web Developer',
        birthDay: 1999
      },
      {
        id: 124,
        name: 'Gustavo',
        profession: 'Front-End Developer',
        birthDay: 1998
      },
      {
        id: 125,
        name: 'Gabriel',
        profession: 'Back-End Developer',
        birthDay: 1996
      }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()
