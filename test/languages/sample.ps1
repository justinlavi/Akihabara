[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string] $Name,
    [int] $Count = 3,
    [switch] $Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-Greeting {
    param([string] $Target)
    return "Hello, $Target"
}

$records = 1..$Count | ForEach-Object {
    [pscustomobject]@{ Index = $_; Message = Get-Greeting -Target $Name }
}

try {
    $records | Where-Object Index -gt 1 | ForEach-Object { $_.Message }
} catch {
    Write-Error $_
} finally {
    if ($Force) { Write-Verbose 'Forced run complete' }
}
