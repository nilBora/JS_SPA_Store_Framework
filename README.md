# Store SPA

### (Origin Dasboard Template)[https://github.com/moeddami/nuxt-material-admin]

## Описание

Все запросы для стора идут по роуту `table/{name}` в коде логика обрабатывается в `page/table/_plugin/_store/_name.vue`

На беке мы просто создаем dgs с данными которые хотим вывести в админке

.htacces для build что б не возращало 404 для динамических страниц. Copy to dist folder
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```