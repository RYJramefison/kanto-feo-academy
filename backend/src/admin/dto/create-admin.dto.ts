import { MinLength } from 'class-validator';
import { CreatePersonDto } from '../../common/dto/create-person.dto';

export class CreateAdminDto extends CreatePersonDto {
  @MinLength(6)
  password!: string;
}
