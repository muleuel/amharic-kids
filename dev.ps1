# Runs Fidel Friends locally without needing Node.js on your system PATH.
# Usage: right-click > Run with PowerShell, or from a terminal: .\dev.ps1

$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Cyan
    npm install
}

if (-not (Test-Path "dev.db")) {
    Write-Host "Setting up the database..." -ForegroundColor Cyan
    npm run db:push
    npm run db:seed
}

Write-Host "Starting dev server at http://localhost:3000 ..." -ForegroundColor Green
npm run dev
