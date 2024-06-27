// index.js
import express from "express";
import mongoose from "mongoose";
import generateFakeProducts from "./fakeUser.js";
import Product from "./models/products.js";
import { addLogger } from "../utils/logger.js"

const app = express();
const PORT = 3000;
app.use(addLogger)



mongoose.connect("mongodb+srv://agusbertoli:bertoliagustin@cluster6.sgqtmb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster6")
  .then(() => console.log("db is connected"))
  .catch(e => console.log(e));

app.use(express.json());

app.get('/mockingproducts', (req, res) => {
  const products = generateFakeProducts(50);
  res.json(products);
});

app.post('/addproduct', async (req, res) => {
  const { name, description, price, stock, category, status, code, thumbnail } = req.body;

  // Verificar campos requeridos
  const requiredFields = [
    { field: "name", type: "string" },
    { field: "description", type: "string" },
    { field: "price", type: "number" },
    { field: "stock", type: "number" },
    { field: "category", type: "string" },
    { field: "status", type: "string" },
    { field: "code", type: "string" },
    { field: "thumbnail", type: "string" }
  ];

  const missingFields = requiredFields.filter(f => !req.body[f.field]);
  if (missingFields.length > 0) {
    req.logger.error('Campos requeridos faltantes:', missingFields);
    return res.status(400).json({
      error: "Campos requeridos faltantes",
      detalles: missingFields
    });
  }

  try {
    const newProduct = new Product({ name, description, price, stock, category, status, code, thumbnail });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    req.logger.error('Error al crear el producto:', error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
