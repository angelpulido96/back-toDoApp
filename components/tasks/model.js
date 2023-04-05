const mongoose = require('mongoose')
const { Schema } = mongoose

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    limitDate: {
        type: Date,
        required: true
    },
    created: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Created user is required']
    },
    status: {
        type: Number,
        default: 1
    }
}, { timestamps: true, versionKey: false })

const Task = mongoose.models.TaskSchema || mongoose.model('Task', TaskSchema, 'tasks')

module.exports = Task