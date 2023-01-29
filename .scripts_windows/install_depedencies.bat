@echo off

setlocal enabledelayedexpansion

set /a x=0
for /F "delims=" %%p in (depedencies.txt) do (
	IF exist "..\%%p\node_modules\" (
		echo %%p depedencies already exists.
	) ELSE (
		call npm install --prefix "..\%%p" package.json
		call npm audit --prefix "..\%%p" fix --force
		echo %%p depedencies succesfully installed.
	)
)

endlocal

pause