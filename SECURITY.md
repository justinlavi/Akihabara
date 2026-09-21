# Security policy

Akihabara is a declarative color-theme extension with no runtime extension
process, network access, telemetry, or executable code shipped in its VSIX.
Security reports are still welcome for the build, dependency, packaging, or
publishing workflow.

## Reporting a vulnerability

Do not disclose a vulnerability, exposed credential, or other sensitive detail
in a public issue. Use GitHub's private vulnerability-reporting feature for
this repository when available. If it is unavailable, contact the maintainer
using the email address in `package.json` and include enough information to
reproduce and assess the issue.

Please allow reasonable time for investigation and remediation before public
disclosure. Routine theme bugs and visual problems can be filed through the
public issue tracker.

## Repository credentials

No Marketplace, GitHub, npm, Azure, or other credential belongs in this
repository. Local credential files are ignored, and `npm run check` scans files
that could be committed for several common secret formats. Contributors remain
responsible for reviewing every staged change before pushing it publicly.

If a real credential is ever committed, removing it in a later commit is not
sufficient. Revoke or rotate it immediately, then coordinate history cleanup
with the maintainer if necessary.
