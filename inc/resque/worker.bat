@echo off
c:/myoa/bin/php -c c:/myoa/bin/php_cli.ini -f c:/myoa/webroot/inc/resque/worker.php queue=perform_150730
pause