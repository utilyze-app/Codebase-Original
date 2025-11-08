#!/usr/bin/env pwsh
# UTILYZE Codebase Organization Script
# This script organizes the UTILYZE codebase into a logical structure

Write-Host "Organizing UTILYZE Codebase..." -ForegroundColor Green

# Create directory structure
$directories = @(
    "apps",
    "data/raw",
    "data/processed", 
    "assets/images",
    "docs",
    "scripts",
    "archive"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force
    Write-Host "Created directory: $dir" -ForegroundColor Blue
    }
}

Write-Host "Directory structure created successfully!" -ForegroundColor Green

# Verify structure
Write-Host "`nCurrent structure:" -ForegroundColor Yellow
Get-ChildItem -Directory -Recurse | ForEach-Object { 
    Write-Host "  $($_.FullName.Replace((Get-Location).Path, '.'))" -ForegroundColor Cyan
}

Write-Host "`nOrganization complete!" -ForegroundColor Green