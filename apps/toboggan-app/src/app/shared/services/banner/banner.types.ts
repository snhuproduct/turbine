import { AlertType } from '@snhuproduct/toboggan-ui-components-library';

export type INewBanner = Omit<IBanner, 'id'>;

export interface IBannerButton {
  label: string;
  action: (bannerId: number) => void;
  style?: 'primary' | 'secondary';
}

export interface IBanner {
  id: number;
  type: AlertType;
  heading: string;
  message?: string;
  button?: IBannerButton | null;
  autoDismiss?: boolean;
  dismissDelay?: number;
}
