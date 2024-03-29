const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    set: function (v) {
      return v.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Primer letra en mayúscula
      }).join(' ')
    }
  },
  firstLastName: {
    type: String,
    required: [true, 'FirstLastName is required'],
    set: function (v) {
      return v.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Primer letra en mayúscula
      }).join(' ')
    }
  },
  secondLastName: {
    type: String,
    set: function (v) {
      return v.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Primer letra en mayuscula
      }).join(' ')
    }
  },
  cellphone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v)
      },
      message: props => `${props.value} is an invalid number.`
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid format of email.'], // Validación de email
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  confirmPassword: {
    type: String,
    required: [true, 'ConfirmPassword is required']
  },
  avatar: {
    type: Object,
    properties: {
      fileName: {
        type: String,
        required: [true, 'Filename is required']
      },
      type: {
        type: String,
        required: [true, 'Type is required']
      },
      size: {
        type: Number,
        required: [true, 'Size is required']
      },
      width: {
        type: String
      },
      height: {
        type: String
      },
      url: {
        type: String,
        required: [true, 'Url is required']
      }
    }
  },
  status: {
    type: Number,
    default: 1
  }
}, { timestamps: true, versionKey: false, strict: false })

const User = mongoose.models.UserSchema || mongoose.model('User', UserSchema, 'users') //  la primera linea (mongoose.models.UserSchema) verifica que el modelo existe y no sea redefinido, en caso que no exista se crea el modelo

module.exports = User