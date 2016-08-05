@echo off
c:/myoa/bin/php -c c:/myoa/webroot/resque/php_cli.ini -f c:/myoa/webroot/resque/worker.php queue=failed
pause