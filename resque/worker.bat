@echo off
d:/myoa/php53/php -c d:/myoa/webroot80/resque/php_cli.ini -f d:/myoa/webroot80/resque/worker.php queue=default
pause