const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route POST /create
// @desc create new profile
// @access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const {
    firstName,
    lastName,
    description,
    gender,
    birthDate,
    phoneNumber,
    photoUrl,
    city,
    province,
    country,
    hourlyRate,
  } = req.body;

  // validate if profile for user already exits
  const profileExists = await Profile.findOne({ userId });
  if (profileExists) {
    res.status(400);
    throw new Error("A profile with that user already exists");
  }

  const newProfile = await Profile.create({
    userId,
    firstName,
    lastName,
    description,
    gender,
    birthDate,
    phoneNumber,
    photoUrl,
    location: {
      city,
      province,
      country,
    },
    hourlyRate,
  });
  const error = newProfile.validateSync();
  if (error) {
    res.status(400);
    throw new Error(error.errors);
  } else {
    res.status(201).json(newProfile);
  }
});

// @route PUT /update
// @desc update profile
// @access Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const profileId = req.body.profileId;
  const {
    firstName,
    lastName,
    description,
    gender,
    birthDate,
    phoneNumber,
    photoUrl,
    city,
    province,
    country,
    hourlyRate,
  } = req.body;

  const update = {
    firstName,
    lastName,
    description,
    gender,
    birthDate,
    phoneNumber,
    photoUrl,
    city,
    province,
    country,
    hourlyRate,
  };

  let updateProfile = await Profile.findByIdAndUpdate(
    profileId,
    { $set: update },
    {
      new: true,
    }
  );

  const error = updateProfile.validateSync();

  if (error) {
    res.status(400);
    throw new Error(error);
  } else {
    res.status(201).json(updateProfile);
  }
});
