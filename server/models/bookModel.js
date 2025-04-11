import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  location: { type: String, required: true },
  phoneNo: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Exchanged'],
    default: 'Available'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
