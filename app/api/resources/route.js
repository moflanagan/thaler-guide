import { resourceModel } from "@/app/models/Resources";
import mongoose from "mongoose";

export async function POST(request) {
const jsonbody = await request.json();
const {title,description} = jsonbody;
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);
await resourceModel.create({title,description})
return Response.json({jsonbody, mongoUrl});
}

export async function GET(req){
  const url = new URL(req.url)
  const mongoUrl = process.env.MONGO_URL;
  mongoose.connect(mongoUrl);
  const sortValue = url.searchParams.get('sort');
  const loadedRows = url.searchParams.get('loadedRows');
  let sortDef;
  if(sortValue === 'alpha') {
    sortDef = {title: 1}
  }

  if(sortValue === 'latest') {
    sortDef = {createdAt:-1}
  }

  return Response.json(await resourceModel.find(null,null,{sort:sortDef, skip: loadedRows, limit:23,}));
}