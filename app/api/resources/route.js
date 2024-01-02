// Importing the resourceModel from the specified path
import { resourceModel } from "@/app/models/Resources";
// Importing mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Function to handle HTTP POST requests
export async function POST(request) {
  // Parsing the JSON body from the request
  const jsonbody = await request.json();
  // Destructuring 'title' and 'description' from the parsed JSON body
  const { title, description } = jsonbody;
  // Fetching the MongoDB connection URL from the environment variables
  const mongoUrl = process.env.MONGO_URL;
  // Connecting to the MongoDB database using mongoose
  mongoose.connect(mongoUrl);
  // Creating a new resource document in the database with 'title' and 'description'
  await resourceModel.create({ title, description });
  // Returning a JSON response with the parsed JSON body and the MongoDB URL
  return Response.json({ jsonbody, mongoUrl });
}

// Function to handle HTTP GET requests
export async function GET(req) {
  // Parsing the URL from the request
  const url = new URL(req.url);
  // Fetching the MongoDB connection URL from the environment variables
  const mongoUrl = process.env.MONGO_URL;
  // Connecting to the MongoDB database using mongoose
  mongoose.connect(mongoUrl);
  // Retrieving the 'sort' and 'loadedRows' query parameters from the URL
  const sortValue = url.searchParams.get('sort');
  const loadedRows = url.searchParams.get('loadedRows');
  let sortDef;
  // Defining sort criteria based on the 'sortValue'
  if (sortValue === 'alpha') {
    sortDef = { title: 1 }; // Sorting by 'title' in ascending order
  }
  if (sortValue === 'latest') {
    sortDef = { createdAt: -1 }; // Sorting by 'createdAt' in descending order
  }
  // Fetching and returning resource documents from the database based on query parameters
  return Response.json(await resourceModel.find(null, null, { sort: sortDef, skip: loadedRows, limit: 23 }));
}
