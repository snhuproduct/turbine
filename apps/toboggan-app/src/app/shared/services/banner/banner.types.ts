import { AlertType } from '@snhuproduct/toboggan-ui-components-library';

export type INewBanner = Omit<IBanner, 'id'>;

export interface IBanner {
  id: number;
  type: AlertType;
  heading: string;
  message?: string;
  button?: {
    label: string;
    action: (bannerId: number) => void;
  };
}
