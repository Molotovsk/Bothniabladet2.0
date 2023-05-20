import getConfig from 'next/config';
import { Schema, model } from 'mongoose';

const { serverRuntimeConfig } = getConfig();
const { connectionString } = serverRuntimeConfig;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

// mongoose models with schema definitions

function userModel() {
  const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: String, lowercase: true, required: true, default: "customer" },
    discount: { type: Number, required: false, default: 0 }
  }, {
    // add createdAt and updatedAt timestamps
    timestamps: true
  });

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
    }
  });

  return model('User', schema);
}

const User = userModel();

const imageSchema = new Schema(
  {
    created_at: Date,
    width: Number,
    height: Number,
    asset_id: String,
    filename: String,
    tags: [String],
    context: {
      alt: String,
      caption: String,
    },
    url: String,
    price: String,
  },
  {
    // Add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const Image = model('Image', imageSchema);

export const db = {
  User,
  Image,
};
