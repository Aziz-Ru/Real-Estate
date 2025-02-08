import { faker } from "@faker-js/faker";
import db from "../index";
import { userSchema } from "../schema/user";

const userFactory = async (count: number) => {
  try {
    const fakeusers = [];
    for (let i = 0; i < count; i++) {
      const fuser = {
        uid: faker.string.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        emailVerified: faker.datatype.boolean(),
        confirmationCode: faker.string.numeric({ length: 6 }),
        confirmationCodeSentAt: faker.date.recent(),
        confirmedAt: faker.date.recent(),
        isActivated: faker.datatype.boolean(),
        deviceId: faker.string.uuid(),
        photoUrl: faker.image.avatar(),
        gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
        platform: faker.helpers.arrayElement(["WEB", "ANDROID", "IOS"]),
        lastSignedInAt: faker.date.recent(),
      };
      fakeusers.push(fuser);
    }
    await db.insert(userSchema).values(fakeusers);
    console.log("Users seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users: ", error);
    process.exit(1);
  }
};

export default userFactory;
