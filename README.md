# Роутинг и авторизация (11 спринт)
# Тестирование React-приложений (12 спринт)

## Проектная работа: "Stellar Burger"

### Структура:

- cypress/ — каталог теста Cypress
- src/ — корневой каталог
- src/components/ — каталог компонентов
- src/images/ — каталог изображений
- src/pages/ — каталог основных страниц
- src/services/ — каталог служебных файлов
- src/services/__tests__/ — каталог тестов Jest
- src/stories/ — каталог Storybook
- src/utils/ — каталог с утилитами

### Важные файлы:

- src/index.tsx — точка входа приложения
- src/services/store.ts — хранилище приложения
- src/services/slices/*.tsx — слайсы хранилища

### Установка и запуск

Для установки и запуска проекта необходимо выполнить команды:

```
npm install
npm run start
```

Для запуска Storybook выполните:

```
npm run storybook
```

Для запуска линтера выполните:

```
npm run lint
```

Для запуска форматтера выполните:

```
npm run format
```

### Запуск тестов

Для запуска тестов Jest:

```
jest
```


Для запуска тестов Jest cо статисикой покрытия:

```
jest:cov
```

Для открытия статистики покрытия тестов Jest в браузере Chrome:

```
jest:cov:open
```

Для того чтобы открыть Cypress:

```
cy:open
```

Для запуска тестов Cypress в терминале:

```
cy:run
```

Для запуска тестов E2E Cypress в браузере Chrome:

```
npm run e2e:chrome
```

---

**Ссылка на макет: _[Stellar Burger](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)_**

**Ссылка на проект: _[Stellar Burger](https://github.com/alexandr-rodionov/stellar-burgers.git)_**
