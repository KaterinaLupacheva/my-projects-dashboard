export const CustomTheme: CustomTheme = {
  color: {
    grey: '#A4A6B3',
    textPrimary: 'rgba(0, 0, 0, 0.87)',
  },
};

type CustomTheme = {
  color: ColorProps;
};

type ColorProps = {
  grey: string;
  textPrimary: string;
};
