declare module 'react-native-vector-icons/Ionicons' {
  import React from 'react';
  import { TextProps } from 'react-native';
  import { IconProps } from 'react-native-vector-icons/Icon';

  export interface IoniconsProps extends IconProps, TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class Ionicons extends React.Component<IoniconsProps> {}
}

declare module 'react-native-vector-icons/*' {
  import React from 'react';
  import { TextProps } from 'react-native';
  import { IconProps } from 'react-native-vector-icons/Icon';

  export interface CustomIconProps extends IconProps, TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class CustomIcon extends React.Component<CustomIconProps> {}
}
