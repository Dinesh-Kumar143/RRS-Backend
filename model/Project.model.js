import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const ProjectSchema = mongoose.Schema(
    {
        _id: {
            type: Number,
        },
        name: {
            type: String,
            required: true,
            default: ""
        },
    },
    {
        _id: false
    }
)
ProjectSchema.plugin(AutoIncrement, { id: "project_seq", inc_field: "_id" });
export const Project = mongoose.model("Project", ProjectSchema);