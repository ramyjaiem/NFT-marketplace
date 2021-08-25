import { ReactNode } from 'react';
import styled from 'styled-components';

interface AppButtonProps {
  children: ReactNode;
  size?: string;
  primary?: boolean;
  onClick?: () => any;
  width?: number;
  heavyText?: boolean;
}

interface ButtonStyleProps {
  size?: string;
  primary?: boolean;
  width?: number;
  heavyText?: boolean;
  onClick: () => void;
}

export const Button = styled.button<ButtonStyleProps>`
  width: ${(props) => (!!props.width ? `${props.width}px` : `100%`)};
  height: ${(props) => (props.size === 'large' ? '60px' : '45px')};
  background-color: ${(props) => (props.primary ? props.theme.colors.blue : props.theme.colors.white)};
  border-radius: ${(props) => (props.heavyText ? '20px' : '20px')};
  font-weight: ${(props) => (props.heavyText ? 'bold' : 'normal')};
  font-size: ${(props) => (props.heavyText ? '18px' : '16px')};
  color: ${(props) => (props.primary ? props.theme.colors.white : props.theme.colors.blue)};
  outline: none;
  border: ${(props) => `1px solid ${props.theme.colors.blue}`};
  cursor: pointer;
  &:focus,
  &:hover {
    box-shadow: ${(props) => `0 0 10px ${props.theme.colors.primary}`};
  }
`;

export default function AppButton(props: AppButtonProps) {
  const { children, size = 'small', primary = true, width, heavyText = false, onClick = () => {}, ...rest } = props;
  return (
    <Button size={size} primary={primary} width={width} heavyText={heavyText} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
}
