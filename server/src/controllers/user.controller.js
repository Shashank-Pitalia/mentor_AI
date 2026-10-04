import{updateProfileSchema , changePasswordSchema} from "../validators/user.validator.js";
import { updateUserProfile , changeUserPassword } from "../services/user.services.js";
import { deleteUserProfile } from "../services/user.services.js";

export const updateProfile = async (req, res) => {
    try {
        // Validate request body
        const validatedData = updateProfileSchema.parse(req.body);

        // Update user profile
        const result = await updateUserProfile(req.user.id, validatedData);

        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const changePassword = async (req, res) => {
    try{
        const validatedData = changePasswordSchema.parse(req.body);

        const result = await changeUserPassword(req.user.id, validatedData);
        
        return res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;
         const validatedData = deleteProfileSchema.parse(req.body);

        const result = await deleteUserProfile(userId, validatedData);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};



