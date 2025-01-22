import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/types/use-case';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { FavoriteListNotFoundError } from './errors/favorite-list-not-found';
import { FavoriteListRepository } from '../../repositories/favorite-list-repository.interface';

export type UnFavoriteProductRequest = {
  userId: string;
  productId: string;
};

export type UnFavoriteProductResponse = void;

@Injectable()
export class UnFavoriteProductUseCase
  implements UseCase<UnFavoriteProductRequest, UnFavoriteProductResponse>
{
  constructor(private readonly favoriteListRepo: FavoriteListRepository) {}

  async execute(request: UnFavoriteProductRequest): Promise<void> {
    try {
      const exists = await this.favoriteListRepo.exists(
        new UniqueEntityID(request.userId),
      );

      if (!exists) {
        throw new FavoriteListNotFoundError();
      }

      const favoriteList = await this.favoriteListRepo.findById(
        new UniqueEntityID(request.userId),
      );

      favoriteList.unfavoriteProduct(new UniqueEntityID(request.productId), favoriteList.products);

      await this.favoriteListRepo.favoriteProdcut(favoriteList);
    } catch (error) {
      throw error;
    }
  }
}