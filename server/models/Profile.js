const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  description: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  phone_number: {
    type: String,
  },
  photo_url: {
    type: String,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    index: true,
    required: true,
  },
  availability: [
    {
      start_at: {
        type: Date,
        required: true,
        index: true,
      },
      end_at: {
        type: Date,
        required: true,
      },
    },
  ],
  hourlyWage: {
    type: Number,
  },
});
