const { faker } = require('@faker-js/faker')
const Car = require('./../src/entities/car')
const CarCategory = require('./../src/entities/CarCategory')
const customer = require('./../src/entities/customer')
const { join } = require('path')
const { writeFile } = require('fs/promises')
const Customer = require('./../src/entities/customer')

const seedBaseFolder = join(__dirname, '../', 'database')
const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []
for (let i = 0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  carCategory.carIds.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    age: faker.datatype.number({ min: 18, max: 50 })
  })
}

const write = (filename, data) =>
  writeFile(join(seedBaseFolder, filename), JSON.stringify(data))
;(async () => {
  await write('cars.json', cars)
  await write('customers.json', customers)
  await write('carCategory.json', [carCategory])
})()
