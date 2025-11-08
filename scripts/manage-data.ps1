#!/usr/bin/env pwsh
# UTILYZE Data Management Script
# Manages data processing pipeline for UTILYZE applications

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("process", "clean", "backup", "status")]
    [string]$Action = "status"
)

Write-Host "UTILYZE Data Management Tool" -ForegroundColor Green
Write-Host "Action: $Action`n" -ForegroundColor Yellow

switch ($Action) {
    "status" {
    Write-Host "Data Directory Status:" -ForegroundColor Blue
        
        if (Test-Path "data/raw") {
            $rawFiles = Get-ChildItem "data/raw" -Recurse -File | Measure-Object
            Write-Host "  Raw data files: $($rawFiles.Count)" -ForegroundColor Cyan
        }
        
        if (Test-Path "data/processed") {
            $processedFiles = Get-ChildItem "data/processed" -Recurse -File | Measure-Object
            Write-Host "  Processed files: $($processedFiles.Count)" -ForegroundColor Cyan
        }
        
    Write-Host "`nDirectory sizes:" -ForegroundColor Blue
    Get-ChildItem "data" -Directory | ForEach-Object {
            $size = (Get-ChildItem $_.FullName -Recurse -File | Measure-Object -Property Length -Sum).Sum
            $sizeGB = [math]::Round($size / 1GB, 2)
            Write-Host "  $($_.Name): $sizeGB GB" -ForegroundColor Cyan
        }
    }
    
    "clean" {
    Write-Host "Cleaning temporary files..." -ForegroundColor Blue
        # Add cleanup logic here
    Write-Host "Cleanup complete!" -ForegroundColor Green
    }
    
    "process" {
    Write-Host "Processing raw data..." -ForegroundColor Blue
        # Add data processing logic here
    Write-Host "Processing complete!" -ForegroundColor Green
    }
    
    "backup" {
    Write-Host "Backing up processed data..." -ForegroundColor Blue
        $backupDir = "data/backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
        if (Test-Path "data/processed") {
            Copy-Item "data/processed" $backupDir -Recurse
            Write-Host "Backup created: $backupDir" -ForegroundColor Green
        }
    }
}

Write-Host "`nUsage: ./manage-data.ps1 [-Action <process|clean|backup|status>]" -ForegroundColor Yellow