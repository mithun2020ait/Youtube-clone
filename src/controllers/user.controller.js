import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadFileToCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;
    console.log("email: ", email, "password: " , password);

    if(
        [fullName, email, username, password].some((fields) =>
        fields?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const userExists = User.findOne({
        $or: [{ email }, { username }]
    }) 

    if(userExists) {
        throw new ApiError(400, "User already exists")
    }

    const avtarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avtarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avtarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(400, "Avatar upload failed")
    }

    const  user = awaitUser.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createUser) {
        throw new ApiError(500, "Some thing went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponce(200, createUser, "User created successfully")
    )

});

export { registerUser };