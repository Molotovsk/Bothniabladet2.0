import getConfig from 'next/config';
import mongoose from 'mongoose';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Image: Image()
};

// mongoose models with schema definitions

function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userType: {type: String, lowercase: true, required: true, default: "customer"},
        discount: {type: Number, required: false, default: 0}
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

    return mongoose.models.User || mongoose.model('User', schema);
}


    const imageSchema = new mongoose.Schema({
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
    });
    
    export const Image = mongoose.model('Image', imageSchema);