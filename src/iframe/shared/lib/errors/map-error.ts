import type { GlobalError, GraphQLError } from './types';

export const GLOBAL_ERROR_EVENT = 'app:global-error';

export const mapErrorToNotification = (error: any): GlobalError | null => {
  const graphQLErrors: GraphQLError[] = error?.response?.errors || error?.errors || [];

  if (!graphQLErrors.length) {
    if (error instanceof Error) {
      return { title: 'Error', message: error.message };
    }
    return { title: 'Unknown Error', message: 'Something went wrong' };
  }

  const firstError = graphQLErrors[0];

  switch (firstError.type) {
    case 'NOT_FOUND':
      return {
        title: 'Репозиторий не найден',
        message:
          'Мы не смогли найти указанный репозиторий. Проверьте правильность названия (owner/repo) или права доступа.',
        variant: 'warning',
      };

    case 'FORBIDDEN':
      return {
        title: 'Доступ запрещен',
        message: 'У вас нет прав для просмотра этого ресурса.',
        variant: 'critical',
      };

    case 'RATE_LIMITED':
      return {
        title: 'Слишком много запросов',
        message: 'Превышен лимит запросов к API GitHub. Пожалуйста, подождите немного.',
        variant: 'warning',
      };

    default:
      return {
        title: 'Ошибка сервера',
        message: firstError.message || 'Произошла непредвиденная ошибка.',
        variant: 'critical',
      };
  }
};
