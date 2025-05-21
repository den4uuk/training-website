// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Їжаків',
        version: '1.0.0',
        description: 'Документація API для Сайту про Їжаків',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення кінцевих точок (endpoints) REST API та операцій з ними
    paths: {
        '/api/hedgehogs': {
            // GET запит для отримання всіх їжаків
            get: {
                summary: 'Отримати всіх їжаків',
                responses: {
                    '200': {
                        description: 'Список всіх їжаків',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Hedgehog' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нового їжака
            post: {
                summary: 'Створити нового їжака',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Hedgehog' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт їжака",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Hedgehog' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретного їжака за ID
        '/api/hedgehogs/{id}': {
            // GET запит для отримання їжака за ID
            get: {
                summary: 'Отримати їжака за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID їжака',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт їжака",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Hedgehog' },
                            },
                        },
                    },
                    '404': { description: 'Їжака не знайдено' },
                },
            },

            // PUT запит для повного оновлення їжака за ID
            put: {
                summary: 'Повністю оновити їжака',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID їжака',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Hedgehog' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт їжака",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Hedgehog' },
                            },
                        },
                    },
                    '404': { description: 'Їжака не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення їжака за ID
            patch: {
                summary: 'Частково оновити їжака',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID їжака',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Hedgehog' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт їжака",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Hedgehog' },
                            },
                        },
                    },
                    '404': { description: 'Їжака не знайдено' },
                },
            },
            // DELETE запит для видалення даних про їжака за ID
            delete: {
                summary: 'Видалити дані про їжака',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID їжака',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Їжака не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта Їжак
            Hedgehog: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я їжака",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік їжака у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота їжака в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага їжака в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать їжака',
                    },
                    description: {
                        type: 'string',
                        description: "Опис їжака (необов'язкове поле)",
                    },
                },
            },
        },
    },
};
