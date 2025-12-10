import { pool } from "../../config/db";
import dynamicInputToInsert from "../../helper/dynamicInputToInsert";
import dynamicInputToUpdate from "../../helper/dynamicInputToUpdate";

const validInput = [
  "name",
  "sku",
  "regular_price",
  "discount_price",
  "quantity",
  "description",
  "image",
  "category",
  "parent_category",
];

const addProduct = async (payload: Record<string, unknown>) => {
  const { fieldNames, indexes, params } = dynamicInputToInsert(
    payload,
    validInput
  );

  const result = await pool.query(
    `
    INSERT INTO products(${fieldNames}) VALUES(${indexes})
    `,
    params
  );

  return result;
};

const getProducts = async () => {
  const result = await pool.query(`
        SELECT * FROM products
        `);

  return result.rows;
};

const getSingleProduct = async (id: string) => {
  const result = await pool.query(
    `
        SELECT * FROM products WHERE id=$1
        `,
    [id]
  );

  return result;
};

const updateProduct = async (id: string, payload: Record<string, unknown>) => {
  const { setClause, params, idPlaceholderIndex } = dynamicInputToUpdate(
    payload,
    validInput,
    id
  );

  if (setClause.length === 0 && params.length === 0) {
    return { success: false, message: "Nothing to update" };
  }
  const result = await pool.query(
    `
    UPDATE products SET ${setClause} WHERE id=$${idPlaceholderIndex} RETURNING *
    `,
    params
  );

  return {
    success: true,
    message: "Product updated successfully",
    data: result.rows[0],
  };
};

const deleteProduct = async (id: string) => {
  const result = await pool.query(
    `
        DELETE products WHERE id=$1
        `,
    [id]
  );

  return result;
};

export const productService = {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
