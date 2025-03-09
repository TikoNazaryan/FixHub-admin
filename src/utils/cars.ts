import { ICar } from "@store/Store";

export const getFlatCarModelIds = (cars: ICar[]): number[] => {
  const carMoelIds: number[] = [];

  cars.forEach((car) => {
    car.models.forEach((model) => carMoelIds.push(model.id));
  });

  return carMoelIds;
};
