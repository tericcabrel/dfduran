import { Box, UseCheckboxProps, useCheckbox } from '@chakra-ui/react';

type Props = {
  value: string;
  children: React.ReactNode;
  onChange?: UseCheckboxProps['onChange'];
  checked?: boolean;
};

export const TagCheckbox = (props: Props) => {
  const { value, children, onChange, checked } = props;

  const { getInputProps, getRootProps, getLabelProps, getCheckboxProps } = useCheckbox({
    isChecked: checked,
    onChange,
    value,
  });

  return (
    <label {...getRootProps()}>
      <Box
        {...getCheckboxProps()}
        userSelect="none"
        data-value={value}
        px="4"
        py="2"
        bg="gray.800"
        rounded="lg"
        fontWeight="bold"
        fontFamily="heading"
        cursor="pointer"
        shadow="highlight"
        _hover={{ color: 'blue.600' }}
        _checked={{ bg: 'blue.600', color: 'black' }}
        _disabled={{ cursor: 'unset', opacity: 0.4, pointerEvents: 'none' }}
      >
        <span {...getLabelProps()}>{children}</span>
      </Box>
      <input {...getInputProps()} />
    </label>
  );
};
