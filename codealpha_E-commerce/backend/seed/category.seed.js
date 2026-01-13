import express from "express";
import { Category } from "../models/category.model.js";
import { connectDB } from "../db/connectDB.js";
import slugify from "slugify";

const categories = [
  { name: "Phones" },
  { name: "Computers" },
  { name: "SmartWatch" },
  { name: "Camera" },
  { name: "HeadPhones" },
  { name: "Gaming" },
];

const seedCategory = async () => {
  await connectDB();
  try {
    for (const category of categories) {
      const newCategory = await Category.create({
        name: category.name,
        slug: slugify(category.name, { lower: true }),
      });

      console.log(`Created: ${newCategory.name}`);
    }

    console.log("Seeding category complete ✔️");
  } catch (err) {
    console.log("Error seeding category:", err);
  }
};

seedCategory();
