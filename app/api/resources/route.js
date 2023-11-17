import { resourceModel } from "@/app/models/Resources";
import mongoose from "mongoose";

export async function POST(request) {
const jsonbody = await request.json();
const {title,description} = jsonbody;
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);
resourceModel.create({title,description})
return Response.json({jsonbody, mongoUrl});
}

