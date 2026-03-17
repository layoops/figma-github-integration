export type GlobalError = {
  title: string;
  type?: string;
  message?: string;
  variant?: 'critical' | 'info' | 'success' | 'upsell' | 'warning';
};

export type GraphQLError = {
  type?: string;
  message?: string;
  path?: string[];
  locations?: any[];
};
