import { connectDB } from "../db/connectDB.js";
import { Admin } from "../models/admin.model.js";
import bcryptjs from "bcryptjs";
// import { connectDB } from "../db/connectDB.js";

const admins = [
  {
    email: "admin1@example.com",
    password: "hashedpassword1",
    name: "Super Admin",
    role: "admin",
    isVerified: true,
  },
  {
    email: "agent1@example.com",
    password: "hashedpassword2",
    name: "Support Agent",
    role: "agent",
    isVerified: true,
  },
];

const seedAdmins = async () => {
  await connectDB();
  try {
    for (const admin of admins) {
      const existingUser = await Admin.findOne({ email: admin.email });

      if (existingUser) {
        console.log(`User already exists: ${admin.email}`);
        continue;
      }

      const password_hash = await bcryptjs.hash(admin.password, 10);

      const newUser = await Admin.create({
        email: admin.email,
        name: admin.name,
        role: admin.role,
        password: password_hash,
        isVerified: true,
      });

      console.log(`Created: ${newUser.email}`);
    }

    console.log("Seeding complete ✔️");
  } catch (err) {
    console.log("Error seeding admins:", err);
  }
};

seedAdmins();
