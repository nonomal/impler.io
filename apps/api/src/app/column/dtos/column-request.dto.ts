import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  ValidateIf,
  IsNotEmpty,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ColumnDelimiterEnum, ColumnTypesEnum, Defaults } from '@impler/shared';
import { IsValidRegex } from '@shared/framework/is-valid-regex.validator';
import { IsNumberOrString } from '@shared/framework/number-or-string.validator';

export class ColumnRequestDto {
  @ApiProperty({
    description: 'Name of the column',
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Key of the column',
  })
  @IsString()
  key: string;

  @ApiProperty({
    description: 'Alternative possible keys of the column',
    type: Array<string>,
  })
  @IsArray()
  @IsOptional()
  @Type(() => Array<string>)
  alternateKeys: string[];

  @ApiPropertyOptional({
    description: 'While true, it Indicates column value should exists in data',
  })
  @IsBoolean()
  @IsOptional()
  isRequired? = false;

  @ApiPropertyOptional({
    description: 'While true, it Indicates column value should be unique in data',
  })
  @IsBoolean()
  @IsOptional()
  isUnique? = false;

  @ApiPropertyOptional({
    description: 'While true, it Indicates column value should be frozen in data',
  })
  @IsBoolean()
  @IsOptional()
  isFrozen? = false;

  @ApiProperty({
    description: 'Specifies the type of column',
    enum: ColumnTypesEnum,
  })
  @IsEnum(ColumnTypesEnum, {
    message: `type must be one of ${Object.values(ColumnTypesEnum).join(', ')}`,
  })
  type: ColumnTypesEnum;

  @ApiPropertyOptional({
    description: 'Regex if type is Regex',
  })
  @ValidateIf((object) => object.type === ColumnTypesEnum.REGEX)
  @Validate(IsValidRegex)
  @IsNotEmpty()
  regex: string;

  @ApiPropertyOptional({
    description: 'Description of Regex',
  })
  @ValidateIf((object) => object.type === ColumnTypesEnum.REGEX)
  @IsString()
  @IsOptional()
  regexDescription: string;

  @ApiPropertyOptional({
    description: 'List of possible values for column if type is Select',
  })
  @ValidateIf((object) => object.type === ColumnTypesEnum.SELECT)
  @Type(() => Array<string>)
  selectValues: string[] = [];

  @ApiPropertyOptional({
    description: 'List of date formats for column if type is Date',
  })
  @ValidateIf((object) => object.type === ColumnTypesEnum.DATE)
  @Type(() => Array<string>)
  dateFormats: string[] = Defaults.DATE_FORMATS;

  @ApiProperty({
    description: 'Sequence of column',
  })
  @IsNumber()
  @IsOptional()
  sequence: number;

  @ApiProperty({
    description: 'Default value for cell',
  })
  @IsOptional()
  @Validate(IsNumberOrString)
  defaultValue?: string | number;

  @ApiPropertyOptional({
    description: 'If true, column can have multiple values',
  })
  @IsBoolean()
  @IsOptional()
  allowMultiSelect?: boolean;

  @ApiPropertyOptional({
    description: 'Specify the delimiter for multi-select value',
    enum: ColumnDelimiterEnum,
  })
  @IsOptional()
  @IsEnum(ColumnDelimiterEnum, {
    message: `Delimiter must be one of ${Object.values(ColumnDelimiterEnum).join(', ')}`,
  })
  delimiter?: ColumnDelimiterEnum;
}
