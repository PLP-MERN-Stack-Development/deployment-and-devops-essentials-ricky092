# PowerShell deployment health check script
# Usage: .\deploy-check.ps1 -BackendUrl "https://your-app.onrender.com"

param(
    [Parameter(Mandatory=$true)]
    [string]$BackendUrl
)

Write-Host "Checking backend health at: $BackendUrl/health" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "$BackendUrl/health" -Method Get -UseBasicParsing
    
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend is healthy (HTTP $($response.StatusCode))" -ForegroundColor Green
        Write-Host "Response: $($response.Content)" -ForegroundColor Gray
        exit 0
    } else {
        Write-Host "❌ Backend health check failed (HTTP $($response.StatusCode))" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Backend health check failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
