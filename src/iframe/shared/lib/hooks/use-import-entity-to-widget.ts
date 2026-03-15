import type { MutationOptions } from '@tanstack/react-query';

import { useMutation } from '@tanstack/react-query';

import { useImportEntityStatusFromWidget } from './use-import-entity-status-from-widget';

type UseImportGithubEntityToWidgetParams<TData, TVariables> = {
  mutationFn: MutationOptions<TData, unknown, TVariables>['mutationFn'];
  onSuccess: (data: TData) => void;
};

export const useImportEntityToWidget = <TData, TVariables>({
  mutationFn,
  onSuccess,
}: UseImportGithubEntityToWidgetParams<TData, TVariables>) => {
  const { importStatus, setImportStatus } = useImportEntityStatusFromWidget();

  const mutation = useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      setImportStatus('loading');
      onSuccess(data);
    },
    onError: (error) => {
      console.error('Failed to import selected items', error);
    },
  });

  return {
    importEntity: mutation.mutate,
    isImporting: mutation.isPending || importStatus === 'loading',
  };
};
