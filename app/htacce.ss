#RewriteEngine On
#RewriteCond %{HTTP_HOST} ^www.sitename\.ru$ [NC]
#RewriteRule ^(.*)$ http://sitename.ru/$1 [R=301,L] 

<ifModule mod_expires.c>

AddType application/font-woff2 .woff2
AddType image/svg+xml .svg

ExpiresActive On

# Кэш по-умолчанию
ExpiresDefault "access plus 5 seconds"

# Кэширование изображений и флэш
ExpiresByType image/x-icon "access plus 2592000 seconds"
ExpiresByType image/jpeg "access plus 2592000 seconds"
ExpiresByType image/png "access plus 2592000 seconds"
ExpiresByType image/gif "access plus 2592000 seconds"
ExpiresByType image/svg+xml "access plus 2592000 seconds"
ExpiresByType application/x-shockwave-flash "access plus 2592000 seconds"

# Кэширование css, javascript и текстовых файлов
ExpiresByType text/css "access plus 604800 seconds"
ExpiresByType text/javascript "access plus 604800 seconds"
ExpiresByType application/javascript "access plus 604800 seconds"
ExpiresByType application/x-javascript "access plus 604800 seconds"

# Кэширование html и htm файлов
ExpiresByType text/html "access plus 600 seconds"

# Кэширование xml файлов
ExpiresByType application/xhtml+xml "access plus 600 seconds"

# Нестандартные шрифты сайта
ExpiresByType application/x-font-ttf "access plus 10368000 seconds"
ExpiresByType application/x-font-woff "access plus 10368000 seconds"
ExpiresByType application/vnd.ms-fontobject "access plus 10368000 seconds"
ExpiresByType application/x-font-opentype "access plus 10368000 seconds"
ExpiresByType font/opentype "access plus 10368000 seconds"
ExpiresByType image/svg+xml "access plus 10368000 seconds"

</ifModule>

<ifModule mod_deflate.c>

AddOutputFilterByType DEFLATE text/html text/plain text/xml application/xml application/xhtml+xml text/css text/javascript application/javascript application/x-javascript application/font-woff2 image/svg+xml

</ifModule>