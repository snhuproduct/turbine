import { AlertType } from '@snhuproduct/toboggan-ui-components-library';

export interface IBanner {
  type: AlertType;
  heading: string;
  message?: string;
  button?: {
    label: string;
    action: () => void;
  };
}
