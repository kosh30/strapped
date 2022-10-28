import type { NextApiRequest, NextApiResponse } from 'next';

export default async function echoApiHandler (req: NextApiRequest, res: NextApiResponse)
{
    try{
        res.status(200).json({message:'lo'})
    }catch(ex){
        console.error('Internal server error',ex);
        res.status(500).send('Internal server error');
    }
}
