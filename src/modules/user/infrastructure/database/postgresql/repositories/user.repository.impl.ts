import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/user/domain/contracts/user.repository';
import { User } from 'src/modules/user/domain/entities/user';
import { UserStatus } from 'src/modules/user/domain/value-objects/user-status';
import { UserEntity } from 'src/modules/user/infrastructure/database/postgresql/entities/user.entity';
import { UserFactory } from 'src/modules/user/infrastructure/factories/user.factory';
import { CONNECTION } from 'src/modules/user/user-type';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity, CONNECTION.POSTGRESQL)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<User | null> {
    if (!id) {
      return null;
    }

    const entity = await this.userRepo.findOne({
      where: { id },
    });

    if (!entity) {
      return null;
    }

    return UserFactory.fromEntityTypeOrm(entity);
  }

  async findByUsername(username: string): Promise<User | null> {
    if (!username) {
      return null;
    }
    const entity = await this.userRepo.findOne({
      where: { username },
    });
    if (!entity) {
      return null;
    }
    return UserFactory.fromEntityTypeOrm(entity);
  }

  async create(user: User): Promise<number> {
    if (!user) {
      return null;
    }
    const entity = new UserEntity();
    entity.name = user.name;
    entity.username = user.username;
    entity.email = user.email;
    entity.phone = user.phone;
    entity.status = user.status?.getId() ?? UserStatus.INACTIVE.getId();
    entity.password = user.password;
    entity.created = user.created;
    entity.modified = user.modified;

    // Kiểu 1: Nhanh hơn save() vì không load lại entity, không chạy lifecycle hook
    const result = await this.userRepo.insert(entity);
    return result.identifiers[0].id;

    // Kiểu 2: Trả về đầy đủ entity đã lưu, bao gồm id
    // const result = await this.userRepo.save(entity);
    // return result.id;
  }

  async update(user: User): Promise<void> {
    if (!user) {
      return null;
    }
    const entity = new UserEntity();
    entity.name = user.name;
    entity.username = user.username;
    entity.email = user.email;
    entity.phone = user.phone;
    entity.password = user.password;
    entity.modified = user.modified;

    await this.userRepo.update(user.id, entity);
  }

  async updateStatus(id: number, status: UserStatus): Promise<void> {
    if (!id) {
      return;
    }
    // Kiểu 1: Chỉ chạy một câu SQL UPDATE, nhẹ, nhanh, ko có lifecycle hook
    await this.userRepo.update(id, { status: status.getId() });

    // Kiểu 2: có thể join, thêm điều kiện phức tạp
    // await this.userRepo
    //   .createQueryBuilder()
    //   .update()
    //   .set({ status: status.getId() })
    //   .where('id = :id', { id })
    //   .execute();

    // Kiểu 3: có lifecycle hooks, SELECT rồi UPDATE
    // const user = await this.userRepo.findOneBy({ id });
    // user.status = status.getId();
    // await this.userRepo.save(user);
  }

  async findAll(pagination: { page: number; limit: number }): Promise<{ data: User[]; total: number }> {
    const [data, total] = await this.userRepo.findAndCount({
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });

    return {
      data: data.map(user => UserFactory.fromEntityTypeOrm(user)),
      total,
    };
  }
}
