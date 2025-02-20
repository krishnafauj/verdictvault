import connectDB from "../models/mongoconnect.js";
import { useLocation } from "react-router-dom";
const caseview =async (req, res) => {
    const { blockhain } = req.body;
    try {
        console.log(blockhain);
        console.log("caseview");
        const db = await connectDB();
        res.status(200)
    } catch (error) {
        console.error('Error fetching cases:', error);
    }
}
export default caseview;