# fridmak.github.io

Личный сайт-портфолио Андрея Батина — .NET backend developer.

Одностраничник на чистом HTML, CSS и JavaScript: без фреймворков, сборки и зависимостей.
Деплоится через GitHub Pages из ветки `main`.

## Структура

```
index.html        вся разметка и контент
styles.css        оформление, адаптив, анимации
script.js         прогресс скролла, reveal-анимации, счётчики, активный пункт меню
favicon.svg       иконка
Batin_Andrey_CV.pdf  резюме для скачивания
```

## Локальный запуск

```bash
python -m http.server 8123
```

Открыть `http://localhost:8123`.

## Правки

Контент — прямо в `index.html`: секции идут по порядку `hero → metrics → experience →
projects → oss → stack → education → contact`. Стили — в `styles.css`, токены темы
в `:root` (цвета, радиусы, шрифты).
