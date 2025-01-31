import Link from 'next/link';
import { modals } from '@mantine/modals';
import { Controller, useForm } from 'react-hook-form';
import {
  Stack,
  TextInput as Input,
  Text,
  Divider,
  SimpleGrid,
  Title,
  Group,
  CloseButton,
  Select,
  useMantineColorScheme,
} from '@mantine/core';

import { ColumnTypesEnum, DEFAULT_VALUES, IColumn } from '@impler/shared';
import { colors, COLUMN_TYPES, DELIMITERS, MODAL_KEYS, MODAL_TITLES } from '@config';

import { Button } from '@ui/button';
import { Textarea } from '@ui/textarea';
import { Checkbox } from '@ui/checkbox';
import { MultiSelect } from '@ui/multi-select';
import { CustomSelect } from '@ui/custom-select';

interface ColumnFormProps {
  data?: Partial<IColumn>;
  isLoading?: boolean;
  onSubmit: (data: IColumn) => void;
}

export function ColumnForm({ onSubmit, data, isLoading }: ColumnFormProps) {
  const { colorScheme } = useMantineColorScheme();
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IColumn>({
    defaultValues: data,
  });
  const typeValue = watch('type');
  const multiSelectValue = watch('allowMultiSelect');

  const onClose = () => {
    modals.close(MODAL_KEYS.COLUMN_UPDATE);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="xs">
        <Group style={{ alignItems: 'flex-start' }}>
          <Stack spacing={0} style={{ flexGrow: 1 }}>
            <Title order={4}>{MODAL_TITLES.COLUMN_UPDATE}</Title>
            <Text size="sm">Specify column details and how validations will be performed</Text>
          </Stack>
          <CloseButton onClick={onClose} />
        </Group>
        <div>
          <Divider size="xs" />
          <SimpleGrid cols={2} spacing={0} breakpoints={[{ maxWidth: 'lg', cols: 1 }]}>
            <Stack spacing="sm" p="xs">
              <Title order={5}>Column Details</Title>
              <Input
                required
                label="Column Name"
                description="Name of the column, visible in mapping step"
                {...register('name')}
                error={errors.name?.message}
                placeholder="Name of the column*"
              />
              <Input
                required
                label="Column Key"
                {...register('key')}
                description="Primary key and key to use while generating a sample file"
                placeholder="Column Key"
                error={errors.key?.message}
              />
              <Controller
                name="alternateKeys"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MultiSelect
                    creatable
                    clearable
                    searchable
                    value={value}
                    onChange={onChange}
                    description="Suggested keys to find appropriate column from the file"
                    label="Alternative column keys"
                    placeholder="Alternative column keys"
                    getCreateLabel={(query) => `+ ${query}`}
                    data={Array.isArray(value) ? value : []}
                    onCreate={(newItem) => {
                      onChange([...(Array.isArray(value) ? value : []), newItem]);

                      return newItem;
                    }}
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    label="Column Type"
                    data={COLUMN_TYPES}
                    placeholder="Type"
                    value={value}
                    data-autofocus
                    onChange={onChange}
                    onBlur={onBlur}
                    description="Primary validation to apply on column"
                  />
                )}
              />
              {typeValue === ColumnTypesEnum.SELECT ? (
                <>
                  <Controller
                    name="selectValues"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <MultiSelect
                        creatable
                        clearable
                        searchable
                        label="Select Values"
                        placeholder="Select Values"
                        description="User can only select value from the provided list"
                        getCreateLabel={(query) => `+ Add ${query}`}
                        data={Array.isArray(value) ? value : []}
                        value={value}
                        onCreate={(newItem) => {
                          onChange([...(Array.isArray(value) ? value : []), newItem]);

                          return newItem;
                        }}
                        onChange={onChange}
                      />
                    )}
                  />
                </>
              ) : null}
              {typeValue === ColumnTypesEnum.DATE ? (
                <Controller
                  name="dateFormats"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <MultiSelect
                      creatable
                      clearable
                      searchable
                      value={value}
                      label="Date Formats"
                      placeholder="Date Formats"
                      description="User can provide date in any of the list formats"
                      data={[
                        'DD/MM/YYYY',
                        'DD/MM/YY',
                        'MM/DD/YYYY',
                        'MM/DD/YY',
                        ...(Array.isArray(value) ? value : []),
                      ]}
                      getCreateLabel={(query) => `Add "${query}"`}
                      onCreate={(newItem) => {
                        onChange([...(Array.isArray(value) ? value : []), newItem]);

                        return newItem;
                      }}
                      onChange={onChange}
                    />
                  )}
                />
              ) : null}
              {typeValue === ColumnTypesEnum.REGEX && (
                <>
                  <Input
                    required
                    {...register('regex')}
                    label="Regular expression"
                    error={errors.regex?.message}
                    placeholder="Regular expression"
                  />
                  <Textarea
                    autosize
                    minRows={2}
                    label="Regular expression description"
                    placeholder="Regular expression description"
                    register={register('regexDescription')}
                  />
                </>
              )}
              <Controller
                name="defaultValue"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    label="Default Value"
                    placeholder="Default Value"
                    description={
                      <>
                        Value used in response when cell is empty,{' '}
                        <Link target="_blank" href="https://docs.impler.io/platform/default-value">
                          read more
                        </Link>
                      </>
                    }
                    data={DEFAULT_VALUES}
                  />
                )}
              />
            </Stack>
            <Stack spacing="sm" p="xs" bg={colorScheme === 'dark' ? colors.BGSecondaryDark : colors.BGSecondaryLight}>
              <Title order={5}>Column Validations</Title>
              <Checkbox
                label="Required Values"
                register={register('isRequired')}
                description="User have to map this column with uploaded column during map column step and value must be filled during review step."
              />
              {typeValue === ColumnTypesEnum.SELECT ? (
                <Checkbox
                  label="Multi Select Values"
                  register={register('allowMultiSelect')}
                  description="Users can pick multiple values from the list. Sample will also allow selecting multiple values."
                />
              ) : (
                <Checkbox
                  label="Unique Values Only"
                  register={register('isUnique')}
                  description="Users will be required to resolve any duplicated values inside of this column prior to import."
                />
              )}
              {multiSelectValue && typeValue === ColumnTypesEnum.SELECT ? (
                <Controller
                  name="delimiter"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label="Delimiter"
                      data={DELIMITERS}
                      placeholder="Comma (,)"
                      value={value}
                      data-autofocus
                      defaultValue=","
                      onChange={onChange}
                      description="Delimiter used to separate multiple select values"
                    />
                  )}
                />
              ) : null}
              <Checkbox
                label="Freeze Column"
                register={register('isFrozen')}
                description="Will freeze column left side in generated sample and in Review section."
              />
            </Stack>
          </SimpleGrid>
        </div>
        <Stack align="flex-end">
          <Button type="submit" loading={isLoading}>
            Save
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
