import dbConnect from "@/backend/config/dbConnect";
import {newProduct} from "@/backend/controllers/productControllers"
import nc from 'next-connect';

const handler = nc();

dbConnect();

handler.post(newProduct);

export default handler;