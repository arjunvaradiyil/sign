import clientPromise, { getDatabaseName } from "@/lib/mongodb";

export type Signature = {
  name: string;
  profession: string;
  mobile: string;
  location: string;
  signedAt: Date;
};

const COLLECTION = "signatures";
const COUNT_OFFSET = 200;

async function getCollection() {
  const client = await clientPromise();
  return client.db(getDatabaseName()).collection<Signature>(COLLECTION);
}

export async function insertSignature(
  signature: Omit<Signature, "signedAt">
): Promise<string> {
  const collection = await getCollection();
  const result = await collection.insertOne({
    ...signature,
    signedAt: new Date(),
  });
  return result.insertedId.toString();
}

export async function countSignatures(): Promise<number> {
  const collection = await getCollection();
  const count = await collection.countDocuments();
  return count + COUNT_OFFSET;
}
