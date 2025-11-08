#!/usr/bin/env pwsh
# UTILYZE Development Setup Script
# Sets up the development environment for all applications

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("all", "gas-maps", "chatbot", "webapp")]
    [string]$App = "all"
)

Write-Host "UTILYZE Development Setup" -ForegroundColor Green
Write-Host "Setting up: $App`n" -ForegroundColor Yellow

# Setup root environment file
if (Test-Path ".env.example") {
    if (!(Test-Path ".env")) {
        Copy-Item ".env.example" ".env"
            Write-Host "Created root .env from template" -ForegroundColor Cyan
        } else {
        Write-Host "Root .env already exists" -ForegroundColor Green
    }
}

function Setup-App {
    param([string]$AppPath, [string]$AppName)
    
    if (Test-Path $AppPath) {
    Write-Host "Setting up $AppName..." -ForegroundColor Blue
        Push-Location $AppPath
        
        # Setup environment file
        if (Test-Path ".env.example") {
            if (!(Test-Path ".env.local")) {
                Copy-Item ".env.example" ".env.local"
                Write-Host "  Created .env.local from template" -ForegroundColor Cyan
            } else {
                Write-Host "  .env.local already exists" -ForegroundColor Green
            }
        }
        
        if (Test-Path "package.json") {
            Write-Host "  Installing dependencies..." -ForegroundColor Cyan
            # Use pnpm for ai-chatbot, npm for others
            if ($AppName -eq "AI Chatbot") {
                pnpm install
            } else {
                npm install
            }
            Write-Host "  $AppName setup complete!" -ForegroundColor Green
        } else {
            Write-Host "  No package.json found in $AppName" -ForegroundColor Yellow
        }
        
        Pop-Location
    } else {
    Write-Host "  $AppName directory not found: $AppPath" -ForegroundColor Red
    }
}

switch ($App) {
    "all" {
        Setup-App "apps/GasLeakMaps" "Gas Leak Maps"
        Setup-App "apps/ai-chatbot" "AI Chatbot"
        Setup-App "apps/utilyze-webapp" "UTILYZE Web App"
    }
    "gas-maps" {
        Setup-App "apps/GasLeakMaps" "Gas Leak Maps"
    }
    "chatbot" {
        Setup-App "apps/ai-chatbot" "AI Chatbot"
    }
    "webapp" {
        Setup-App "apps/utilyze-webapp" "UTILYZE Web App"
    }
}

Write-Host "`nDevelopment Environment Ready!" -ForegroundColor Green
Write-Host "Usage: ./setup-dev.ps1 [-App <all|gas-maps|chatbot|webapp>]" -ForegroundColor Yellow
Write-Host "Run apps with: cd apps/[app-name] && npm run dev" -ForegroundColor Cyan