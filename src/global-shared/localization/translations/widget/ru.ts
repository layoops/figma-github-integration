import type { WidgetLocalizationKeys } from '../../types/widget-localization-keys';

export const widgetRu: WidgetLocalizationKeys = {
  common: {
    description: 'Описание',
    import: 'Импорт',
  },

  ui: {
    lastSynced: 'Последняя синхронизация',
    syncAction: 'Обновить',
    updatedAt: 'Обновлено',
    projects: 'Проекты',
  },

  widget: {
    importIssue: 'Импорт задачи/PR/проекта',
    createIssue: 'Создать задачу',
    moreComments: 'Больше комментариев',
    loadMoreComments: 'Загрузить ещё комментарии',
    taskProgress: 'Прогресс задач',
    completedIssues: 'Завершенные задачи',
  },

  tabs: {
    overview: 'Обзор',
    body: 'Описание',
    comments: 'Комментарии',
    relatives: 'Связанное',
  },

  entityMetadata: {
    assignee: { fieldTitle: 'Исполнители' },
    labels: { fieldTitle: 'Метки', emptyText: 'Нет меток' },
    projectField: { fieldTitle: 'Поле проекта: {title}', emptyText: 'Нет поля проекта' },
    relatives: { fieldTitle: 'Связи' },
    projects: { fieldTitle: 'Проекты', emptyText: 'Нет проектов' },
    milestone: { fieldTitle: 'Этап (milestone)', emptyText: 'Нет этапа' },
    development: { fieldTitle: 'Разработка', emptyText: 'Нет связанных объектов' },
    importedEntities: { fieldTitle: 'Импортированные сущности', emptyText: 'Нет объектов' },
    notImportedEntities: { fieldTitle: 'Не импортировано', emptyText: 'Все импортированы' },
  },

  success: {
    tokenRemoved: 'Токен GitHub API успешно удален!',
    tokenAuthorized: 'Токен GitHub API успешно авторизован!',
    settingsSaved: 'Новые настройки успешно сохранены!',
    issueResynced: 'Задача {title} синхронизирована!',
    pullRequestResynced: 'Пул-реквест {title} синхронизирован!',
    issuesImported: 'Успешно импортировано {count} задач!',
    issueImported: 'Задача {title} успешно импортирована!',
    pullRequestImported: 'Пул-реквест {title} успешно импортирован!',
    projectImported: 'Проект {title} успешно импортирован!',
  },

  notifications: {
    unableToResync: 'Не удается выполнить синхронизацию в данный момент, попробуйте еще раз.',
    errorImportingIssues: 'Ошибка при импорте задач из репозитория',
  },
};
