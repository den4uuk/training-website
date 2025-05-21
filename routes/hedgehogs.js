import { Router } from 'express';

const router = Router();
const hedgehogs = []; // Зберігання у пам'яті

router.get('/', (req, res) => {
  res.json(hedgehogs);
});

router.post('/', (req, res) => {
  const hedgehog = req.body;
  if (!hedgehog || !hedgehog.name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  hedgehogs.push(hedgehog);
  console.log('Current hedgehogs:', hedgehogs); // Дебаг
  res.status(201).json({ added: hedgehog, all: hedgehogs });
});

export default router;
