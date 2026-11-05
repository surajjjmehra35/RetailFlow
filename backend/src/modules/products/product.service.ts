
import prisma from "../../config/prisma";

export const getAllProducts = async (
  search?: string,
  page = 1,
  limit = 10,
  stockStatus?: string
) => {
  const skip = (page - 1) * limit;

  const where = {
    active: true,

    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          sku: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),

    ...(stockStatus === "in-stock" && {
      stock: {
        gt: 0,
      },
    }),

    ...(stockStatus === "out-of-stock" && {
      stock: 0,
    }),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: "asc",
      },
      include: {
        schemes: {
          where: {
            active: true,
            AND: [
              {
                OR: [
                  { startsAt: null },
                  { startsAt: { lte: new Date() } },
                ],
              },
              {
                OR: [
                  { endsAt: null },
                  { endsAt: { gte: new Date() } },
                ],
              },
            ],
          },
        },
      },
    }),

    prisma.product.count({
      where,
    }),
  ]);

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
