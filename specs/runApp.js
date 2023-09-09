const fs = require("fs");
const csv = require("csv-parser");
const filePath = "../fixtures/basket.csv";
const basket = [];

/* convert csv file to json */
fs.createReadStream(filePath)
  .pipe(csv({}))
  .on("data", (data) => basket.push(data))
  .on("end", () => {
    console.log(`\n`);
    /* Calculate the total number of fruits */
    function totalNumberOfFruits(basket) {
      let quantity = 0;
      for (let i in basket) {
        quantity += parseInt(basket[i].size);
      }
      console.log(`Total number of fruits: ${quantity}`);
      console.log(`\n`);
    }

    /* Calculate the types of fruits. */
    function typesOfFruits(basket) {
      const distinctNames = new Set(basket.map((fruit) => fruit.name));
      const totalDistinctNames = distinctNames.size;
      console.log(`Types of fruit: ${totalDistinctNames}`);
      console.log(`\n`);
    }

    /* Calculate types of fruits in decending order */
    function sortBasketOfFruits(basket) {
      const fruitTotals = {};

      for (let i in basket) {
        const fruit = basket[i];
        const name = fruit.name;
        const size = parseInt(fruit.size);

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
      console.log(
        `The number of each type of fruit in descending order`,
        sortedFruitTotals
      );
      console.log(`\n`);
    }

    /* Print the characteristics (size, color, shape, days) of each fruit by type */
    function fruitsCharacteristics(basket) {
      const groupedCharacteristics = {};

      for (const fruit of basket) {
        const { name, size, color, shape, days } = fruit;

        if (!groupedCharacteristics[name]) {
          groupedCharacteristics[name] = [];
        }

        groupedCharacteristics[name].push({ size, color, shape, days });
      }
      console.log(
        `The characteristics of each fruit by type`,
        groupedCharacteristics
      );
      console.log(`\n`);
    }

    /* calculate any fruits which has been in the basket for over 3 days */
    function listfruitsOverThreeDays(basket) {
      const filteredFruits = basket.filter((fruit) => parseInt(fruit.days) > 3);
      const distinctFruitInfo = filteredFruits.map((fruit) => ({
        name: fruit.name,
        size: fruit.size,
      }));
      console.log(
        "Distinct fruits name and size over 3 days old:",
        distinctFruitInfo
      );
    }

    totalNumberOfFruits(basket);
    typesOfFruits(basket);
    sortBasketOfFruits(basket);
    fruitsCharacteristics(basket);
    listfruitsOverThreeDays(basket);
  });
