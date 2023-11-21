import { Router } from "express";
import { login, register, profile } from "../controllers/auth_controller.js";
import { authRequiered } from "../middlewares/validateToken.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", authRequiered, profile);

router.post('/', (req, res) => {
    const { name, email } = req.body;
  
    if(!name || !email || type || pass || phone){
        //throw new Error('Data is missing');
        return res.status(400).json({ message: 'Fields are required' });
    }

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
  
    res.status(201).json(newUser);
});

export default router;
