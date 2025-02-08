import db from "..";
import { checkShema } from "../schema/date";

const main = async () => {
  // await userFactory(100);
  await db.insert(checkShema).values({
    date: new Date(),
  });
  const data = await db.select().from(checkShema);
  console.log(data);

  process.exit(0);
};

main();
