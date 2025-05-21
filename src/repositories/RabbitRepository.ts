import { injectable } from 'inversify';
import { Hedgehog, IHedgehog } from '../models/rabbit';

// Клас-репозиторій для роботи з їжаками
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class HedgehogRepository {
    // Метод для отримання всіх їжаків з бази даних
    public async findAll(): Promise<IHedgehog[]> {
        return Hedgehog.find();
    }

    // Метод для пошуку їжака за унікальним ідентифікатором
    public async findById(id: string): Promise<IHedgehog | null> {
        return Hedgehog.findById(id);
    }

    // Метод для створення нового їжака в базі даних
    public async create(hedgehogData: IHedgehog): Promise<IHedgehog> {
        const hedgehog = new Hedgehog(hedgehogData);
        return hedgehog.save();
    }

    // Метод для видалення їжака за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Hedgehog.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про їжака (заміна всіх полів)
    public async update(id: string, hedgehogData: IHedgehog): Promise<IHedgehog | null> {
        return Hedgehog.findByIdAndUpdate(id, hedgehogData, { new: true });
    }

    // Метод для часткового оновлення даних про їжака (оновлення лише вказаних полів)
    public async patch(id: string, hedgehogData: Partial<IHedgehog>): Promise<IHedgehog | null> {
        return Hedgehog.findByIdAndUpdate(id, { $set: hedgehogData }, { new: true });
    }
}
