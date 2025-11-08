<#
Convert submodules into normal folders and optionally push the root repo to your GitHub account.

Usage examples:
# Dry run (safe):
.\scripts\convert-submodules-to-folders.ps1 -DryRun

# Real run, detect submodules from .gitmodules and convert, but don't push:
.\scripts\convert-submodules-to-folders.ps1

# Real run and push to your GitHub repo (create the repo first on github.com):
.\scripts\convert-submodules-to-folders.ps1 -GitHubUser YOUR_USERNAME

# Real run converting only specific submodules & push:
.\scripts\convert-submodules-to-folders.ps1 -Submodules @('apps/ai-chatbot','apps/utilyze-webapp') -GitHubUser YOUR_USERNAME

Notes:
- This script modifies the superproject (root) only. It does NOT push to the original submodule remotes.
- It creates a backup archive in the parent folder before changing anything.
- Review the dry-run output first.
#>
param(
    [string[]]$Submodules,
    [string]$GitHubUser,
    [switch]$DryRun
)

function Write-Log($m) { Write-Host "[convert-submodules] $m" }

# Ensure running from repo root (script assumes that)
$scriptPath = Convert-Path $PSScriptRoot
Set-Location $scriptPath

# 1) Backup
$timestamp = (Get-Date).ToString('yyyyMMdd_HHmm')
$backup = Join-Path (Resolve-Path ..).Path "UTILYZE-backup-$timestamp.zip"
if ($DryRun) { Write-Log "DRYRUN: Would create backup: $backup" } else {
    Write-Log "Creating backup archive: $backup"
    try {
        Compress-Archive -Path . -DestinationPath $backup -Force -ErrorAction Stop
        Write-Log "Backup created"
    } catch {
        Write-Log "Backup failed: $_. Exception: $($_.Exception.Message)"
        throw
    }
}

# 2) Determine submodules
if (-not $Submodules -or $Submodules.Count -eq 0) {
    if (Test-Path .gitmodules) {
        Write-Log "Reading submodules from .gitmodules"
        $lines = git config --file .gitmodules --get-regexp 'submodule\..*\.path' 2>$null
        if ($LASTEXITCODE -ne 0 -or -not $lines) { Write-Log "No submodules found in .gitmodules"; $Submodules = @() } else {
            $Submodules = $lines | ForEach-Object { ($_ -split '\s+')[1] }
        }
    } else {
        Write-Log "No .gitmodules file found and no submodules parameter provided"
        $Submodules = @()
    }
}

if ($Submodules.Count -eq 0) {
    Write-Log "No submodules to convert. Exiting."
    exit 0
}

Write-Log "Submodules to process: $($Submodules -join ', ')"

foreach ($s in $Submodules) {
    Write-Log "--- Processing: $s ---"
    if ($DryRun) {
        Write-Log "DRYRUN: Would copy $s to temp, deinit, remove modules metadata, git rm -f, restore files, git add & commit"
        continue
    }

    # make a temp copy of working files
    $tmp = Join-Path $env:TEMP ("subtmp_" + (Split-Path $s -Leaf))
    if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue }
    Write-Log "Copying $s -> $tmp"
    Copy-Item -Recurse -Force $s $tmp

    # deinit and remove git metadata for submodule in superproject
    Write-Log "Deinitializing submodule in superproject"
    git submodule deinit -f -- $s 2>$null
    $modulePath = Join-Path ".git/modules" $s
    if (Test-Path $modulePath) {
        Write-Log "Removing module metadata: $modulePath"
        Remove-Item -Recurse -Force $modulePath -ErrorAction SilentlyContinue
    }

    # remove gitlink entry from index (this will remove the folder from the index; may remove working tree entry)
    Write-Log "git rm -f $s"
    git rm -f $s

    # restore folder contents from temp and add as normal files
    Write-Log "Restoring $s from $tmp"
    Copy-Item -Recurse -Force $tmp $s
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue

    # add and commit
    git add $s
    try {
        git commit -m "Convert submodule $s to normal folder" | Out-Null
        Write-Log "Committed converted folder $s"
    } catch {
        Write-Log "No commit made for $s (possibly no changes). Continuing."
    }
}

# Remove .gitmodules if present
if (Test-Path .gitmodules) {
    Write-Log "Removing .gitmodules"
    try {
        git rm --cached .gitmodules -f 2>$null
    } catch { }
    Remove-Item .gitmodules -Force -ErrorAction SilentlyContinue
    try { git commit -m "Remove .gitmodules" | Out-Null } catch { Write-Log "No .gitmodules commit required" }
}

# Verify no gitlinks remain
$gitlinks = git ls-files --stage | Select-String "160000" -SimpleMatch
if ($gitlinks) {
    Write-Log "Warning: gitlink entries still present:"; $gitlinks
} else {
    Write-Log "No gitlink entries found"
}

# Ensure all files staged and committed
git add .
try {
    git commit -m "Add repository files (convert submodules to folders)" | Out-Null
    Write-Log "Committed root-level additions"
} catch { Write-Log "No top-level commit necessary" }

# Optionally set remote and push
if ($GitHubUser) {
    $remoteUrl = "https://github.com/$GitHubUser/UTILYZE.git"
    Write-Log "Setting remote origin -> $remoteUrl"
    try { git remote remove origin 2>$null } catch { }
    git remote add origin $remoteUrl
    git branch -M main
    Write-Log "Pushing to $remoteUrl (you will be prompted for credentials). Use your username and a Personal Access Token as password."
    git push -u origin main
} else {
    Write-Log "No GitHub user provided; skipping push. Provide -GitHubUser to set remote and push."
}

Write-Log "Done. Review the repo and the backup created at: $backup"

# EOF
