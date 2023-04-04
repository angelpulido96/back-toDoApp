const mongoose = require('mongoose')
const { Schema } = mongoose

const RoleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  permissions: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => {
        return v.length > 0
      },
      message: 'Permissions need at least 1'
    }
  },
  status: {
    type: Number,
    default: 1
  }
}, { timestamps: true, versionKey: false })

const Role = mongoose.models.RoleSchema || mongoose.model('Role', RoleSchema, 'roles')

module.exports = Role