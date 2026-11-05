import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    { sku: "SKU-BS-075", name: "Glucose biscuit 75g", dealerPrice: 81.20, stock: 140, unit: "case" },
    { sku: "SKU-DT-1KG", name: "Detergent powder 1kg", dealerPrice: 101.50, stock: 85, unit: "case" },
    { sku: "SKU-TE-250", name: "Tea leaf 250g", dealerPrice: 118.00, stock: 0, unit: "case" }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: product,
      create: product
    });
  }

  const biscuit = await prisma.product.findUniqueOrThrow({ where: { sku: "SKU-BS-075" } });
  const detergent = await prisma.product.findUniqueOrThrow({ where: { sku: "SKU-DT-1KG" } });

  await prisma.scheme.upsert({
    where: { id: "seed-biscuit-scheme" },
    update: {},
    create: {
      id: "seed-biscuit-scheme",
      name: "Buy 10 cases, get 1 free",
      productId: biscuit.id,
      minimumQuantity: 10,
      freeQuantity: 1
    }
  });

  await prisma.scheme.upsert({
    where: { id: "seed-detergent-scheme" },
    update: {},
    create: {
      id: "seed-detergent-scheme",
      name: "3% off on 5 or more cases",
      productId: detergent.id,
      minimumQuantity: 5,
      discountPercent: 3
    }
  });

  console.log("RetailFlow sample products and schemes seeded.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
