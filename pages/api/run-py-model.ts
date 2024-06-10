import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const inputData = req.body;
        // Call the API
        const response = await axios.post('https://dipitvasdev.pythonanywhere.com/predict', inputData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        if (response.status !== 200) {
            throw new Error(`${response.status} : ${response.statusText}`);
        }
        res.status(200).json(response.data); 

    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: (err as Error).message });
    }
}