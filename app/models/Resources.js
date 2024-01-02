// Importing necessary modules from 'mongoose'
const { Schema, models, model } = require("mongoose");

// Creating a schema for the 'resource' collection in MongoDB
const resourceSchema = new Schema({
  title: { type: String, required: true }, // Field for the resource title, which is required
  description: { type: String, required: true } // Field for the resource description, also required
}, { timestamps: true }); // Adding timestamps for 'createdAt' and 'updatedAt'

// Exporting a resource model using Mongoose
export const resourceModel = models?.resourceModel || model('resourceModel', resourceSchema);
