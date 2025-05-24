import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/modules/user/domain/contracts/user.repository';
import { User } from 'src/modules/user/domain/entities/user';
import { UserStatus } from 'src/modules/user/domain/value-objects/user-status';
import { UserDocument, UserModel } from 'src/modules/user/infrastructure/database/mongodb/schema/user.model';
import { UserFactory } from 'src/modules/user/infrastructure/factories/user.factory';
import { CONNECTION } from 'src/modules/user/user-type';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(UserModel.name, CONNECTION.MONGODB)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: number): Promise<User | null> {
    if (!id) {
      return null;
    }
    const document = await this.userModel.findOne({ user_id: id }).exec();
    return UserFactory.fromDocumentMongoose(document);
  }

  async findByUsername(username: string): Promise<User | null> {
    if (!username) {
      return null;
    }
    const document = await this.userModel.findOne({ username }).exec();
    return UserFactory.fromDocumentMongoose(document);
  }

  async create(user: User): Promise<number> {
    if (!user) {
      return null;
    }
    const newUser = new this.userModel({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      status: user.status?.getId() ?? UserStatus.INACTIVE.getId(),
      password: user.password,
      created: user.created,
      modified: user.modified,
      user_id: Date.now().valueOf(), // Fake tạm thôi, mongo không có tự tăng, dùng snowflake thì ảnh hưởng tới mysql, postgresql
    });
    const savedUser = await newUser.save();

    return savedUser.user_id;
  }

  async update(user: User): Promise<void> {
    if (!user) {
      return null;
    }
  }

  async updateStatus(id: number, status: UserStatus): Promise<void> {
    if (!id || !status) {
      return;
    }
  }

  async findAll(pagination: { page: number; limit: number }): Promise<{ data: User[]; total: number }> {
    if (!pagination) {
      return { data: [], total: 0 };
    }
  }
}
