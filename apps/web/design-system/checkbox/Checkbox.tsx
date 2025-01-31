import { Checkbox as MantineCheckbox, MantineNumberSize } from '@mantine/core';
import useStyles from './Checkbox.styles';

interface CheckboxProps {
  label?: string;
  defaultChecked?: boolean;
  register?: any;
  checked?: boolean;
  description?: string;
  size?: MantineNumberSize;
}

export function Checkbox({ label, defaultChecked, register, checked, description, size }: CheckboxProps) {
  const { classes } = useStyles();

  return (
    <MantineCheckbox
      classNames={classes}
      defaultChecked={defaultChecked}
      checked={checked}
      label={label}
      size={size}
      description={description}
      {...register}
    />
  );
}
