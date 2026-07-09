import { MongoClient } from "mongodb";

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in environment variables");
  }
  return uri;
}

function getClientPromise() {
  if (clientPromise) {
    return clientPromise;
  }

  const uri = getUri();

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export default getClientPromise;

export function getDatabaseName() {
  return process.env.MONGODB_DB_NAME || "signcamp";
}
