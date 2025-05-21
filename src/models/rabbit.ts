import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Їжак"
interface IHedgehog {
    name: string; // Ім'я їжака
    age: number; // Вік їжака у роках
    height: number; // Висота їжака в сантиметрах
    weight: number; // Вага їжака в кілограмах
    gender: 'male' | 'female'; // Стать їжака: 'male' - самець, 'female' - самка
    description?: string; // Опис їжака (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Їжак"
const hedgehogSchema = new Schema<IHedgehog>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
});

// Створення моделі Mongoose на основі схеми
export const Hedgehog = model<IHedgehog>('Hedgehog', hedgehogSchema);
export type { IHedgehog }; // Експортуємо інтерфейс для використання в інших файлах
