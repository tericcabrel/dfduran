import { AbsoluteCenter, Flex, Icon, chakra, useMergeRefs } from '@chakra-ui/react';
import { useRef } from 'react';

import { useElementState } from 'lib/hooks/use-element-state';
import { useSearchParams } from 'lib/hooks/use-search-params';

import { CloseIcon, SearchIcon } from './icons';

type Props = {
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const SearchInput = (props: Props) => {
  const { placeholder = 'Search articles', onChange, defaultValue } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [setInputRef, inputStatus] = useElementState();
  const [setButtonRef, buttonStatus] = useElementState();
  const params = useSearchParams();

  const hasValue = params.searchString.length > 0;
  const isInteracting = ['hover', 'focus'].includes(inputStatus) || buttonStatus === 'hover';
  const showClear = hasValue && isInteracting;

  const handleButtonClick = () => {
    const el = ref.current;

    if (!el) {
      return;
    }

    el.value = '';
    onChange('');
    setTimeout(() => {
      el.focus();
    });
  };

  return (
    <Flex position="relative" role="search">
      <chakra.input
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        type="search"
        // @ts-ignore
        ref={useMergeRefs(setInputRef, ref)}
        id="query"
        name="q"
        bg="gray.800"
        flex="1"
        rounded="lg"
        height="48px"
        paddingLeft="6"
        paddingRight="16"
        fontSize="lg"
        fontFamily="heading"
        _placeholder={{
          color: 'gray.500',
        }}
      />
      <AbsoluteCenter axis="vertical" right="16">
        <chakra.button
          boxSize="32px"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          rounded="md"
          ref={setButtonRef}
          hidden={!showClear}
          tabIndex={-1}
          type="button"
          aria-controls="query"
          color="white"
          onPointerDown={(event) => {
            event.preventDefault();
          }}
          onClick={handleButtonClick}
          _hover={{
            bg: 'whiteAlpha.300',
          }}
        >
          <Icon as={CloseIcon} fontSize="lg" />
        </chakra.button>
      </AbsoluteCenter>
      <AbsoluteCenter axis="vertical" pointerEvents="none" right="5" color="gray.500">
        <SearchIcon />
      </AbsoluteCenter>
    </Flex>
  );
};
