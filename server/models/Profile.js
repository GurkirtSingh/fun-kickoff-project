const mongoose = require("mongoose");
const moment = require("moment");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  description: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthDate: {
    type: Date,
    min: moment(Date.now()).subtract(100, "years"),
    max: moment(Date.now()).subtract(19, "years"),
  },
  phoneNumber: {
    type: String,
  },
  photoUrl: {
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
      startAt: {
        type: Date,
        required: true,
        index: true,
      },
      endAt: {
        type: Date,
        required: true,
      },
    },
  ],
  hourlyRate: {
    type: Number,
  },
});

const phoneNumberValidator = function (value) {
  return /\d{3}-\d{3}-\d{4}/.test(value);
};

const photoUrlValidator = function (value) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
    value
  );
};

const availabilityEndAtValidator = function (value) {
  return value > this.startAt;
};

profileSchema
  .path("phoneNumber")
  .validate(phoneNumberValidator, "`{VALUE}` is not valid phone number");
profileSchema
  .path("photoUrl")
  .validate(photoUrlValidator, "`{VALUE}` is not valid photo url");
profileSchema
  .path("availability.endAt")
  .validate(availabilityEndAtValidator, "End date should be after start date");

module.exports = Profile = mongoose.model("profile", profileSchema);
