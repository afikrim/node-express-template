export type UserDto = {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: string;
  updated_at?: string;
};

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserDto = Partial<CreateUserDto>;
