@echo off

setlocal enabledelayedexpansion

set /a x=0
for /F "delims=" %%p in (depedencies.txt) do (
	IF exist "..\%%p\node_modules\" (
		rd /s /q "..\%%p\node_modules"
		echo %%p depedencies succesfully deleted.
	) ELSE (
		echo %%p depedencies don't exist.
	)
)

endlocal

pause