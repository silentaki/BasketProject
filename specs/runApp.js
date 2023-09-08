const fs = require('fs');
const csv = require('csv-parser');
const filePath = '../fixtures/basket.csv';
const basket = [];

fs.createReadStream(filePath)
  .pipe(csv({}))
  .on("data", (data) => basket.push(data))
  .on("end", () => {
    function totalNumberOfFruits(basket) {
      let totalPrice = 0;
      for (let i in basket) {
        totalPrice += parseInt(basket[i].size);
      }
      return console.log(`total number of fruits: ${totalPrice}`);
    }

    function typesOfFruits(basket) {
      const distinctNames = new Set(basket.map((fruit) => fruit.name));
      const totalDistinctNames = distinctNames.size;
      console.log("Total Number of Distinct Names:", totalDistinctNames);
    }

    function sortBasketOfFruits(basket) {
      const fruitTotals = {};

      for (let i = 0; i < basket.length; i++) {
        const fruit = basket[i];
        const name = fruit.name;
        const size = parseFloat(fruit.size);

        if (!isNaN(size)) {
          if (!fruitTotals[name]) {
            fruitTotals[name] = 0;
          }

          fruitTotals[name] += size;
        }
      }
      const sortedFruitTotals = Object.entries(fruitTotals)
        .map(([name, total]) => ({ name, total }))
        .sort((a, b) => b.total - a.total);

      console.log(sortedFruitTotals);
    }

    function fruitsCharacteristics(basket) {
      const groupedCharacteristics = {};

      for (const fruit of basket) {
        const { name, size, color, shape, days } = fruit;

        if (!groupedCharacteristics[name]) {
          groupedCharacteristics[name] = [];
        }

        groupedCharacteristics[name].push({ size, color, shape, days });
      }

      console.log(groupedCharacteristics);
    }

    function listfruitsOverThreeDays(basket) {
      const matchingFruitTotals = {};

      for (const fruit of basket) {
        const { name, days, size } = fruit;
        const daysValue = parseInt(days);

        if (daysValue > 3) {
          if (!matchingFruitTotals[name]) {
            matchingFruitTotals[name] = 0;
          }

          matchingFruitTotals[name] += parseFloat(size);
        }
      }

      for (const name in matchingFruitTotals) {
        const totalSize = matchingFruitTotals[name];
        console.log(`${totalSize} ${name} are over 3 days old`);
      }
    }
    totalNumberOfFruits(basket);
    typesOfFruits(basket);
    sortBasketOfFruits(basket);
    fruitsCharacteristics(basket);
    listfruitsOverThreeDays(basket);
  });
