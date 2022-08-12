import { AlertType } from '@snhuproduct/toboggan-ui-components-library';

export interface IModalAlert {
  id: number;
  type: AlertType;
  title: string;
  message: string;
  buttons: {
    primary: {
      label: string;
      action: (modalId: number) => void;
    };
    secondary?: {
      label: string;
      action: (modalId: number) => void;
    };
  };
}
