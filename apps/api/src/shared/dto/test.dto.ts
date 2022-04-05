import { IsNotEmpty } from 'class-validator';

export class TestDto {
    @IsNotEmpty()
  readonly name: string;
}
