#!/bin/sh
# Codevertex Website — Container Entrypoint
# Runs Prisma migrations (via direct DB URL) then seeds, then starts Next.js
# Mirrors auth-api/scripts/entrypoint.sh pattern

set -e

echo "=========================================="
echo "  Codevertex Website Startup"
echo "=========================================="

# Use direct DB URL for migrations to bypass pgbouncer prepared-statement limits.
# Fall back to DATABASE_URL if DIRECT_DATABASE_URL is not set.
MIGRATE_URL="${DIRECT_DATABASE_URL:-$DATABASE_URL}"

echo ""
echo "=========================================="
echo "  Running Prisma migrations"
echo "=========================================="
MAX_RETRIES=30
RETRY=0

until DATABASE_URL="$MIGRATE_URL" npx prisma migrate deploy > /dev/null 2>&1 || [ $RETRY -eq $MAX_RETRIES ]; do
  RETRY=$((RETRY+1))
  echo "Database not ready yet (attempt $RETRY/$MAX_RETRIES) — retrying in 5s..."
  sleep 5
done

if [ $RETRY -eq $MAX_RETRIES ]; then
  echo "WARNING: Migration timed out — proceeding anyway (DB may already be migrated)"
else
  echo "Migrations complete (attempt $RETRY)"
fi

echo ""
echo "=========================================="
echo "  Running seed (idempotent)"
echo "=========================================="
DATABASE_URL="$MIGRATE_URL" npx prisma db seed || echo "WARNING: Seed completed with warnings (non-fatal)"

echo ""
echo "=========================================="
echo "  Starting Codevertex Website"
echo "=========================================="
exec node server.js
