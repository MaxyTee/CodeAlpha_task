import express from "express";
import { Category } from "../models/category.model.js";
import { connectDB } from "../db/connectDB.js";
import slugify from "slugify";

const categories = [
  {
    name: "Rings",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4Xvn7PpZ76TjS5v5ocLgY8lXG5rvY_gUMoP265uJOYqkhHyXnEu7m5LQsMgqdCdPjy6gXFTUm6F0zl5lfQSevrtrimYORgBWH-uDhnVMzfnQhcSCQf_kX7OFngthGmmfWU7KJ2NmIUQm6Po1CSLefZwJOuFGLrUoN0NbuUSGCh25tLEs7lT78W0XtsFiVX1OtREJWGDYsXH8yNIJNOoE3hGodcOqIVz2tyuA9CqFMRepie-iYwyj1JcXg8S7iAndkPUBIe3RSEYPS",
  },
  {
    name: "Necklaces",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCUYMgza2ETyoW4C_OJra6WbK4pmc8zLV0EL4yJu3v84SaspG_ZvtzSlnRi5uJ4QX0QtKn_ZP4y-2YzPoIzJLPO2ZEgEcV4MBQG6AJc5SRBTuhKnKcYri_NYQUNPCLzbj0a4ECEgJkQI9sWb-fbEfSUFQ_0KO6pQqVBuv5Y4BVQpWTxbez_VPeaRLv4uXIx-Y-fly1LVTRmx2BI9CUcEKTggzqbSV43PsTCEKdJzsv6XZ83HMVvyujzR0ll5wztt1WeXuXSaAp6LMB",
  },
  {
    name: "Bracelets",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqRGe8UHL_IcsR3i83KkcWYMBradSJ3eJTRqeVVeERkvqt57QryO9uzVRqqpWu4jQaLBpVrngJTl4PHkOCXKUOLM6_awzIAXidXs7W4EETDTvNvWLv6yCn-6N0QR_Bg4Kbbs6luzmTSbyGeya_Mz8mKQV-iJiHgusTZcxQntdoIYTKsuPwgvPFnVumVFDAFvdU542XJAF_9oK1rXN5cUkvow4w1hw44juNJqgv-8gh4Xa6_znpSUFyCT9rc8nuxYPEpxp5KRCTT7at",
  },
  {
    id: 4,
    name: "Earrings",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBn0ZZCBDjhuFYjO85CYaXsruddbuDwu0A5o3r4RM0jIJumXwbpcGVQi9uNprcQrBaVmtErsaDkuksDyPl6tjA1iMD6j6M72IUbIrGNAHb-XcpWIczupoFXX4p6UjxusOtzQKE2d4TscgceJ4wT053F4PnTGlYK6aTMjAJYTbnrvoHVZstUoegt5JKFGySX0QyrxjoR7r0HA-RORA_LxA3eiW63UITy-ir1jIwbDarHvcH600UIFcXHHkmcZmUJh4gB3hq08QmhLky7",
  },
];

const seedCategory = async () => {
  await connectDB();
  try {
    for (const category of categories) {
      const newCategory = await Category.create({
        name: category.name,
        image: category.image,
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
