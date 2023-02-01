@echo off

setlocal enabledelayedexpansion

for %%* in (.) do set current_path=%%~dpn*

set /a x=0
for /F "delims=" %%p in (depedencies.txt) do (
	IF exist "%current_path%%%p\node_modules\" (
		echo %%p depedencies already exists.
	) ELSE (
		call npm install --prefix "%current_path%%%p" package.json
		call npm audit --prefix "%current_path%%%p" fix --force
		echo %%p depedencies succesfully installed.
	)
)

endlocal

pause