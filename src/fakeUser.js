import { faker } from "@Faker-js/Faker";
export const generateFakeProducts = (num) => {
    const products = [];

    for (let i = 0; i < 50; i++) {
      products.push({
         name: faker.commerce.productName(),
         description : faker.commerce.productDescription(),
         price: faker.commerce.price(),
         stock: faker.string.numeric(),
         category: faker.commerce.productAdjective(),
         status: faker.commerce.productAdjective(),
         code: faker.string.uuid(),
         thumbnail: faker.image.avatarGitHub(),
      });
    }
    return products;
   
  };


export default generateFakeProducts