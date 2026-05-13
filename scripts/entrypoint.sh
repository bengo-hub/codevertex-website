#!/bin/sh
# Codevertex Website — Container Entrypoint
# Uses DIRECT_DATABASE_URL (direct postgres, bypasses pgbouncer) for schema sync + seed.
# Falls back to DATABASE_URL if DIRECT_DATABASE_URL is not set.

set -e

echo "=========================================="
echo "  Codevertex Website Startup"
echo "=========================================="

MIGRATE_URL="${DIRECT_DATABASE_URL:-$DATABASE_URL}"

echo ""
echo "=========================================="
echo "  Syncing database schema (prisma db push)"
echo "=========================================="
MAX_RETRIES=30
RETRY=0

until DATABASE_URL="$MIGRATE_URL" prisma db push --accept-data-loss --skip-generate 2>&1 || [ $RETRY -eq $MAX_RETRIES ]; do
  RETRY=$((RETRY+1))
  echo "DB not ready or schema push failed (attempt $RETRY/$MAX_RETRIES) — retrying in 5s..."
  sleep 5
done

if [ $RETRY -eq $MAX_RETRIES ]; then
  echo "WARNING: Schema push timed out — proceeding anyway"
else
  echo "Schema in sync (attempt $RETRY)"
fi

echo ""
echo "=========================================="
echo "  Running seed (idempotent)"
echo "=========================================="
DATABASE_URL="$MIGRATE_URL" prisma db seed || echo "WARNING: Seed completed with warnings (non-fatal)"

echo ""
echo "=========================================="
echo "  Starting Codevertex Website"
echo "=========================================="
exec node server.js
