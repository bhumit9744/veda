const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = fs.existsSync(path.resolve(__dirname, '../dist-vedamonteza'))
  ? path.resolve(__dirname, '../dist-vedamonteza')
  : path.resolve(__dirname, '../dist');
const htaccessPath = path.join(distDir, '.htaccess');
const redirectsPath = path.join(distDir, '_redirects');
const zipPath = path.resolve(__dirname, '../vedamonteza.zip');

if (!fs.existsSync(distDir)) {
  console.error(`Error: ${distDir} does not exist. Run vite build first.`);
  process.exit(1);
}

// 1. Write the Apache/LiteSpeed .htaccess for subdirectory hosting
const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /vedamonteza/
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /vedamonteza/index.html [L]
</IfModule>

# Caching for static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType video/mp4 "access plus 1 month"
  ExpiresByType font/woff "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 month"
</IfModule>
`;

fs.writeFileSync(htaccessPath, htaccessContent, 'utf8');
console.log('✓ Created Apache/LiteSpeed .htaccess with RewriteBase /vedamonteza/');

// 2. Clean up Netlify-only _redirects in Hostinger build
if (fs.existsSync(redirectsPath)) {
  fs.unlinkSync(redirectsPath);
  console.log('✓ Cleaned up Netlify _redirects file');
}

// 3. Delete existing zip if present
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// 4. Create ZIP containing all files including .htaccess via .NET ZipFile
console.log('Packaging build into ZIP...');
const psCommand = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${distDir.replace(/\\/g, '\\\\')}', '${zipPath.replace(/\\/g, '\\\\')}', [System.IO.Compression.CompressionLevel]::Optimal, $false)"`;
execSync(psCommand, { stdio: 'inherit' });

console.log('✓ Successfully created ZIP at:', zipPath);

// 5. Inspect ZIP contents to confirm .htaccess is included
const verifyCommand = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; $zip = [System.IO.Compression.ZipFile]::OpenRead('${zipPath.replace(/\\/g, '\\\\')}'); $zip.Entries | Select-Object -First 10 FullName, Length; $zip.Dispose()"`;
console.log('ZIP sample contents:');
execSync(verifyCommand, { stdio: 'inherit' });

const checkHtaccessCommand = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; $zip = [System.IO.Compression.ZipFile]::OpenRead('${zipPath.replace(/\\/g, '\\\\')}'); $zip.Entries | Where-Object { $_.Name -eq '.htaccess' } | Select-Object FullName, Length; $zip.Dispose()"`;
console.log('Checking .htaccess in ZIP:');
execSync(checkHtaccessCommand, { stdio: 'inherit' });
