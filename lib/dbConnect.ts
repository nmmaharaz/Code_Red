
import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionObj = {
  userCollection : "user",
  blogCollection : "blog",
  communityCollection: "community",
  groupMemberCollection: "groupMember",
}

const url = process.env.MONGODB_URI!

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function dbConnect(conllection:string) {
  try {
    if(!conllection){
      throw new Error('Collection name is required');
    }
    if(!process.env.DB_NAME){
      throw new Error('DB_NAME is required');
    }
    if(!url){
      throw new Error('MONGODB_URI is required');
    }

    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const cachedDb = client.db(process.env.DB_NAME)
    const collection = cachedDb.collection(conllection);
    return collection;
  } catch(err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
}
