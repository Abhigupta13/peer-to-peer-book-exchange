import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Owner', 'Seeker'],
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
