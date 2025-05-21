import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { HedgehogRepository } from '../repositories/RabbitRepository';

// Створюємо новий обробник HTTP-запитів Express
const router = Router();
// Отримуємо екземпляр репозиторію їжаків з контейнера інверсії залежностей
const hedgehogRepository = container.get(HedgehogRepository);

// Обробка HTTP-запиту GET / - отримання всіх записів їжаків
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи їжаків з бази даних через репозиторій
        const hedgehogs = await hedgehogRepository.findAll();
        res.json(hedgehogs);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту GET /:id - отримання запису одного їжака за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук їжака за ідентифікатором
        const hedgehog = await hedgehogRepository.findById(req.params.id);
        if (hedgehog) {
            res.json(hedgehog);
        } else {
            // Якщо їжак не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис їжака не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту POST / - створення нового запису їжака
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис їжака з даних запиту
        const newHedgehog = await hedgehogRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного їжака
        res.status(201).json(newHedgehog);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PUT /:id - повне оновлення запису їжака
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо їжака з вказаним ID
        const hedgehog = await hedgehogRepository.update(req.params.id, req.body);
        if (hedgehog) {
            return res.json(hedgehog);
        } else {
            // Якщо їжак не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис їжака не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PATCH /:id - часткове оновлення запису їжака
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису їжака - передаються лише ті поля, які потрібно змінити
        const hedgehog = await hedgehogRepository.patch(req.params.id, req.body);
        if (hedgehog) {
            res.json(hedgehog);
        } else {
            // Якщо їжак не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис їжака не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту DELETE /:id - видалення запису їжака
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про їжака за ID
        const hedgehog = await hedgehogRepository.delete(req.params.id);
        if (hedgehog) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про їжака видалено' });
        } else {
            // Якщо їжак не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про їжака не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
