import { NextApiRequest, NextApiResponse } from 'next';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const formData: FormData = req.body;

  const errors = await validateData(formData);
  if (errors.length > 0) {
    res.status(400);
    res.json({ errors });
    return;
  }

  res.status(201);
  res.json({ message: 'Success!' });
};

async function validateData(formData: FormData): Promise<Array<string>> {
  const errors = [];
  // Pretend this is a database & has complicated validation
  const emails = ['used@email.com'];

  if (emails.includes(formData.email)) {
    errors.push('Email already used');
  }

  return errors;
}
