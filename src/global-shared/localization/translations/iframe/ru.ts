import type { IframeLocalizationKeys } from '../../types/iframe-localization-keys';

export const iframeRu: IframeLocalizationKeys = {
  links: {
    newIssue: {
      title: 'Новая задача',
    },
  },

  validation: {
    required: 'Поле обязательно для заполнения',
    repoRequiredForSearch: "Поисковые запросы должны содержать 'repo:владелец/репозиторий'.",
  },

  common: {
    unselectAll: 'Очистить выбор',
    saving: 'Сохранение...',
  },

  header: {
    navigation: {
      backButton: {
        tooltipText: 'Назад',
      },
    },
    menu: {
      anchorButton: {
        tooltipText: 'Меню',
      },
      items: {
        documentation: {
          title: 'Документация',
        },
        settings: {
          title: 'Настройки',
        },
        signOut: {
          title: 'Выйти',
        },
      },
    },
    signInButton: {
      title: 'Войти',
    },
  },

  settingsForm: {
    language: {
      label: 'Язык',
      values: {
        en: 'Английский',
        ru: 'Русский',
      },
    },
    theme: {
      label: 'Тема',
      values: {
        auto: 'Системная',
        dark: 'Тёмная',
        light: 'Светлая',
      },
    },
    issue: {
      label: 'Содержимое issue',
      fields: {
        includeComments: 'Комментарии',
        includeAssignees: 'Исполнители',
        includeLabels: 'Метки',
        includeProjects: 'Проекты',
        includeMilestone: 'Этап (milestone)',
        includeRelationship: 'Связи',
        includeDevelopment: 'Разработка',
      },
    },
    pullRequest: {
      label: 'Содержимое pull request',
      fields: {
        includeComments: 'Комментарии',
        includeAssignees: 'Исполнители',
        includeLabels: 'Метки',
        includeProjects: 'Проекты',
        includeMilestone: 'Этап (milestone)',
        includeRelationship: 'Связи',
        includeDevelopment: 'Разработка',
      },
    },
    project: {
      label: 'Содержимое проекта',
      fields: {
        customField: 'Кастомное поле',
        customFieldCaption:
          'Название поля GitHub Project, отображающего статус элемента (например, «Status»).',
      },
    },
    submitButton: 'Сохранить настройки',
  },

  issueImportForm: {
    searchField: {
      label: 'Поиск',
      placeholder: 'https://github.com/username/repo/issues/1',
    },
  },

  issueCreateForm: {
    targetField: {
      label: 'Цель',
      caption: 'Куда будет создана задача',
      placeholder: 'Репозиторий или проект',
    },
    titleField: {
      label: 'Заголовок',
      caption: 'Краткое описание задачи',
      placeholder: 'Введите заголовок задачи',
    },
    descriptionField: {
      label: 'Описание',
      caption: 'Подробное описание задачи',
      placeholder: 'Введите описание задачи',
    },
  },

  issuePage: {
    title: 'Задача',
    actionImport: {
      label: 'Импортировать',
    },
  },

  pullRequestPage: {
    title: 'Пул-реквест',
    actionImport: {
      label: 'Импортировать',
    },
  },

  issueCreatePage: {
    title: 'Новая задача',
    actionCreate: {
      label: 'Создать',
    },
    actionImportIssue: {
      label: 'Импортировать',
    },
    actionCancel: {
      label: 'Отмена',
    },
  },

  projectPage: {
    title: 'Проект',
    footerActions: {
      import: {
        title: 'Импортировать',
      },
    },
  },

  repoPages: {
    title: 'Репозиторий',
    navigation: {
      issues: 'Задачи',
      pullRequests: 'Пул-реквесты',
      projects: 'Проекты',
    },
  },

  repoIssuesPage: {
    footerActions: {
      import: {
        title: 'Импортировать',
      },
    },
  },

  searchPage: {
    title: 'Результат поиска',
  },

  settingsPage: {
    title: 'Настройки',
  },

  documentationPage: {
    title: 'Документация',
    intro: 'Узнайте, как пользоваться плагином Figma GitHub Integration.',
    sections: {
      gettingStarted: {
        title: 'Начало работы',
        body: 'Войдите через GitHub OAuth (кнопка «Войти через GitHub») или введите Personal Access Token вручную. Токену необходимы права repo и read:user. После авторизации вы сможете импортировать задачи, pull request-ы и проекты прямо в Figma.',
      },
      import: {
        title: 'Импорт задач и pull request-ов',
        body: 'Вставьте ссылку на задачу или pull request в строку поиска на главном экране и нажмите Enter. Чтобы импортировать несколько элементов, откройте репозиторий, отметьте нужные чекбоксами и нажмите «Импортировать».',
      },
      projects: {
        title: 'Импорт проектов',
        body: 'Вставьте ссылку на GitHub Project (например, https://github.com/orgs/myorg/projects/1) в строку поиска. Плагин загрузит все элементы проекта — выберите нужные для размещения на холсте.',
      },
      createIssue: {
        title: 'Создание задачи',
        body: 'Нажмите кнопку «Новая задача» на главном экране. Выберите репозиторий или проект, введите заголовок и описание (необязательно), затем нажмите «Создать». Созданная задача может быть автоматически импортирована в Figma.',
      },
      search: {
        title: 'Поиск',
        body: 'Строка поиска поддерживает синтаксис GitHub Search. Используйте фильтры: repo:владелец/репозиторий, type:issue, type:pr, state:open, state:closed, sort:created, sort:updated. Пример: repo:vercel/next.js state:open type:issue',
      },
      settings: {
        title: 'Настройки',
        body: 'Откройте настройки через меню (правый верхний угол). Можно сменить язык (Русский / Английский), тему (Системная, Светлая, Тёмная) и выбрать, какие поля включать при импорте задач и pull request-ов: комментарии, ответственные, метки, этап, связи и информация о разработке.\n\nДля проектов доступна настройка «Кастомное поле» — название поля GitHub Project, отображающего статус элемента на виджете (например, «Status»).',
      },
      widget: {
        title: 'Виджет',
        body: 'Каждый импортированный элемент становится виджетом на холсте Figma. Виджет содержит четыре вкладки: Обзор (заголовок, статус, метаданные), Тело (описание), Комментарии и Связанные (связанные задачи или PR). Кнопка «Синхронизировать» обновляет данные из GitHub.',
      },
    },
  },

  authorizationPage: {
    title: 'Авторизация',
    alreadyLoggedIn: 'Вы уже вошли в систему.',
    tokenVerifyError: 'Не удалось проверить токен',
    loginWithGitHub: 'Войти через GitHub',
    connectingToGitHub: 'Подключение к GitHub...',
    form: {
      tokenErrorTitle: 'Ошибка токена',
      saveManualToken: 'Сохранить токен вручную',
      showToken: 'Показать',
      hideToken: 'Скрыть',
      generateToken: 'Создать персональный токен доступа',
    },
  },

  entity: {
    shared: {
      entityPreview: {
        metadataSection: {
          title: 'Метаданные',
        },
        comments: {
          loadMore: 'Загрузить ещё комментарии',
          loading: 'Загрузка...',
        },
      },
    },
    issue: {
      entityPreview: {
        metadataGroup: {
          assignees: {
            title: 'Ответственные',
            emptyText: 'Нет ответственных',
          },
          labels: {
            title: 'Метки',
            emptyText: 'Нет меток',
          },
          projects: {
            title: 'Проекты',
            emptyText: 'Нет проектов',
          },
          milestone: {
            title: 'Этап (milestone)',
            emptyText: 'Нет этапа',
          },
          relationship: {
            title: 'Связи',
            emptyText: 'Пока нет',
            issueParent: {
              title: 'Родительская задача',
            },
          },
          development: {
            title: 'Разработка',
            emptyText: 'Пока нет',
          },
        },
      },
      table: {
        title: 'Задачи',
        header: {
          filters: {
            opened: {
              title: 'Открытые',
            },
            draft: {
              title: 'Черновые',
            },
            closed: {
              title: 'Закрытые',
            },
          },
        },
        entityRow: {
          openedByText: 'открыта',
          unknownAuthor: 'неизвестно',
        },
        selection: {
          stats: 'Выбрано {selectedCount} из {totalCount}',
          stats_one: 'Выбран {selectedCount} из {totalCount}',
          stats_few: 'Выбрано {selectedCount} из {totalCount}',
          stats_many: 'Выбрано {selectedCount} из {totalCount}',
          stats_other: 'Выбрано {selectedCount} из {totalCount}',
        },
        emptyState: {
          noOpenItems: 'Нет открытых задач',
          noClosedItems: 'Нет закрытых задач',
        },
      },
    },
    pullRequest: {
      entityPreview: {
        metadataGroup: {
          assignees: {
            title: 'Ответственные',
            emptyText: 'Нет ответственных',
          },
          labels: {
            title: 'Метки',
            emptyText: 'Нет меток',
          },
          projects: {
            title: 'Проекты',
            emptyText: 'Нет проектов',
          },
          milestone: {
            title: 'Этап (milestone)',
            emptyText: 'Нет этапа',
          },
        },
      },
      table: {
        title: 'Пул-реквесты',
        header: {
          filters: {
            opened: {
              title: 'Открытые',
            },
            closed: {
              title: 'Закрытые',
            },
          },
        },
        entityRow: {
          openedByText: 'открыта',
          unknownAuthor: 'неизвестно',
        },
        selection: {
          stats: 'Выбрано {selectedCount} из {totalCount}',
          stats_one: 'Выбран {selectedCount} из {totalCount}',
          stats_few: 'Выбрано {selectedCount} из {totalCount}',
          stats_many: 'Выбрано {selectedCount} из {totalCount}',
          stats_other: 'Выбрано {selectedCount} из {totalCount}',
        },
        emptyState: {
          noOpenItems: 'Нет открытых пул-реквестов',
          noClosedItems: 'Нет закрытых пул-реквестов',
        },
      },
    },
    project: {
      table: {
        title: 'Проекты',
        header: {
          filters: {
            opened: {
              title: 'Открытые',
            },
            closed: {
              title: 'Закрытые',
            },
          },
        },
        entityRow: {
          updatedText: 'обновлено',
        },
        emptyState: {
          noOpenItems: 'Нет открытых проектов',
          noClosedItems: 'Нет закрытых проектов',
        },
      },
    },
  },

  errors: {
    offline: 'Похоже, вы не в сети. Пожалуйста, проверьте подключение к интернету.',
    invalidGithubData: 'Неверные данные GitHub или отсутствует токен доступа',
    missingAccessToken: 'Отсутствует токен доступа GitHub',
    invalidUrl: 'Неверный URL GitHub. Пожалуйста, введите корректный URL GitHub.',
    unableToProcess:
      'Не удается обработать предоставленные данные GitHub. Пожалуйста, проверьте, существует ли элемент, и повторите попытку.',
    invalidLink:
      'Пожалуйста, предоставьте корректную ссылку на задачу, pull request, проект или репозиторий GitHub',
    repositoryMissingData:
      'В данных репозитория отсутствует владелец или имя. Укажите URL репозитория или владелец/имя.',
    noIssuesFound: 'Задачи или pull request-ы не найдены',
    notFound: 'Не найдено',
    failedToConnect: 'Не удалось подключиться к серверу авторизации',
    invalidAuthUrl: 'Неверный URL авторизации',
    authTimeout: 'Время авторизации истекло. Попробуйте снова.',
  },

  uiComponents: {
    searchField: {
      tooltipText: 'Найти',
    },
    htmlBody: {
      emptyText: 'Нет описания',
    },
  },

  ui: {
    accessTokenWithScope: 'Токен доступа',
  },
};
