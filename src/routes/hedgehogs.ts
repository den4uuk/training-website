import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
    return res.status(200).json({ message: 'GET /api/hedgehogs працює' });
});

router.post('/', (req, res) => {
    const { name, age, height, weight, gender, description } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required' });
    }
    return res.status(201).json({ name, age, height, weight, gender, description });
});

export default router;
