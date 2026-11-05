
import { Request, Response } from "express";
import { getAllProducts } from "./product.service";

export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const search =
      typeof req.query.q === "string"
        ? req.query.q.trim()
        : undefined;

    const page = Math.max(
      1,
      Number(req.query.page) || 1
    );

    const limit = Math.min(
      50,
      Math.max(1, Number(req.query.limit) || 10)
    );

    const stockStatus =
      typeof req.query.stock === "string"
        ? req.query.stock
        : undefined;

    if (
      stockStatus &&
      !["in-stock", "out-of-stock"].includes(stockStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid stock filter. Use in-stock or out-of-stock.",
      });
    }

    const result = await getAllProducts(
      search,
      page,
      limit,
      stockStatus
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};
