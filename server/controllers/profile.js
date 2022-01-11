const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

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

// @route GET /get
// @desc get profile by id
// @access Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profileId = req.query.profileId;

  let profile;
  if (profileId) {
    try {
      profile = await Profile.findById(profileId);
      res.status(200).json({ profile });
    } catch (error) {
      res.status(404);
      if (error instanceof mongoose.Error.CastError) {
        throw new Error(`No profile found by id: ${profileId}`);
      } else {
        throw new Error(error);
      }
    }
  } else {
    res.status(404);
    throw new Error("profileId query parameter is required!!");
  }
});

// @route GET /get-all
// @desc get all profiles
// @access Private
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  let allProfiles = await Profile.find({});
  if (!allProfiles) {
    res.status(404);
    throw new Error("No profile found!!!");
  }
  res.status(200).json({ allProfiles });
});
