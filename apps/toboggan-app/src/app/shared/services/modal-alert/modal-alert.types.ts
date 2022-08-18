import {
  AlertType,
  ButtonConfig,
} from '@snhuproduct/toboggan-ui-components-library';

export interface IModalAlert {
  type: AlertType;
  heading: string;
  message: string;
  alertCondition?: boolean;
  buttons: ButtonConfig[];
}
