import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillDTO <T, U>(dto: ClassConstructor<T>, plainObject: U) {
    return plainToInstance(dto, plainObject, { excludeExtraneousValues: true });
}
