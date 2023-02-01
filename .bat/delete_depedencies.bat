@echo off

setlocal enabledelayedexpansion

for %%* in (.) do set current_path=%%~dpn*

set /a x=0
for /F "delims=" %%p in (depedencies.txt) do (
	IF exist "%current_path%%%p\node_modules\" (
		rd /s /q "%current_path%%%p\node_modules"
		echo %%p depedencies succesfully deleted.
	) ELSE (
		echo %%p depedencies don't exist.
	)
)

endlocal

pause