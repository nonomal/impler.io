import { Injectable } from '@nestjs/common';
import { ColumnRepository } from '@impler/dal';
import { ColumnTypesEnum, FileMimeTypesEnum, ISchemaItem } from '@impler/shared';

import { ExcelFileService } from '@shared/services/file';
import { IExcelFileHeading } from '@shared/types/file.types';
import { DownloadSampleCommand } from './download-sample.command';

@Injectable()
export class DownloadSample {
  constructor(
    private columnsRepository: ColumnRepository,
    private excelFileService: ExcelFileService
  ) {}

  async execute(
    _templateId: string,
    data: DownloadSampleCommand
  ): Promise<{
    file: Buffer;
    type: string;
    ext: string;
  }> {
    const columns = await this.columnsRepository.find(
      {
        _templateId,
      },
      'key type selectValues isRequired allowMultiSelect'
    );

    let parsedSchema: ISchemaItem[], columnKeys: IExcelFileHeading[];
    try {
      if (data.schema) parsedSchema = JSON.parse(data.schema);
    } catch (error) {}

    if (Array.isArray(parsedSchema) && parsedSchema.length > 0) {
      columnKeys = parsedSchema.map((columnItem) => ({
        key: columnItem.key,
        type: (columnItem.type as ColumnTypesEnum) || ColumnTypesEnum.STRING,
        selectValues: columnItem.selectValues,
        isRequired: columnItem.isRequired,
        allowMultiSelect: columnItem.allowMultiSelect,
      }));
    } else {
      // else create structure from existing defualt schema
      columnKeys = columns.map((columnItem) => ({
        key: columnItem.key,
        type: columnItem.type as ColumnTypesEnum,
        selectValues: columnItem.selectValues,
        isRequired: columnItem.isRequired,
        allowMultiSelect: columnItem.allowMultiSelect,
      }));
    }
    const hasMultiSelect = columnKeys.some(
      (columnItem) => columnItem.type === ColumnTypesEnum.SELECT && columnItem.allowMultiSelect
    );
    const buffer = await this.excelFileService.getExcelFileForHeadings(columnKeys, data.data);

    return {
      file: buffer,
      ext: hasMultiSelect ? 'xlsm' : 'xlsx',
      type: hasMultiSelect ? FileMimeTypesEnum.EXCELM : FileMimeTypesEnum.EXCELX,
    };
  }
}
