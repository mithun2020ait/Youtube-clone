import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';

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

    
});

export { registerUser };