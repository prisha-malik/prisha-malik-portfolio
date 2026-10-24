$env:GIT_TERMINAL_PROMPT = "0"
$git = "C:\Users\Deepti Malik\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe"

Write-Host "Running git push..."
$output = & $git push -u origin main 2>&1
Write-Host "PUSH OUTPUT:"
$output | ForEach-Object { Write-Host $_ }
