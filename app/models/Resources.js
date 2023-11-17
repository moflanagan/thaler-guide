const { Schema, models, model } = require("mongoose");

const resourceSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true}
}, {timestamps: true});

export const resourceModel = models?.resourceModel || model('resourceModel', resourceSchema);