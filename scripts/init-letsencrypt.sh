#!/bin/bash

# Let's Encrypt certificate initialization script
# Run this once on first deployment to obtain SSL certificates

set -e

DOMAINS=(dorogans.com www.dorogans.com)
DATA_PATH="./letsencrypt"
CERTBOT_PATH="./certbot/www"
EMAIL="${LETSENCRYPT_EMAIL:-}"
STAGING="${LETSENCRYPT_STAGING:-0}"

RSA_KEY_SIZE=4096

if [ -d "$DATA_PATH/live/dorogans.com" ]; then
  read -p "Existing certificates found. Replace them? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit 0
  fi
fi

echo "### Creating required directories..."
mkdir -p "$DATA_PATH"
mkdir -p "$CERTBOT_PATH"

echo "### Downloading recommended TLS parameters..."
if [ ! -e "$DATA_PATH/options-ssl-nginx.conf" ] || [ ! -e "$DATA_PATH/ssl-dhparams.pem" ]; then
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$DATA_PATH/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$DATA_PATH/ssl-dhparams.pem"
fi

echo "### Creating dummy certificate for ${DOMAINS[0]}..."
CERT_PATH="$DATA_PATH/live/${DOMAINS[0]}"
mkdir -p "$CERT_PATH"
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$RSA_KEY_SIZE -days 1 \
    -keyout '/etc/letsencrypt/live/${DOMAINS[0]}/privkey.pem' \
    -out '/etc/letsencrypt/live/${DOMAINS[0]}/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

echo "### Starting nginx..."
docker compose up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate..."
docker compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/${DOMAINS[0]} && \
  rm -Rf /etc/letsencrypt/archive/${DOMAINS[0]} && \
  rm -Rf /etc/letsencrypt/renewal/${DOMAINS[0]}.conf" certbot
echo

echo "### Requesting Let's Encrypt certificate for ${DOMAINS[*]}..."

# Build domain arguments
DOMAIN_ARGS=""
for domain in "${DOMAINS[@]}"; do
  DOMAIN_ARGS="$DOMAIN_ARGS -d $domain"
done

# Use staging server if requested (for testing)
if [ "$STAGING" != "0" ]; then
  STAGING_ARG="--staging"
else
  STAGING_ARG=""
fi

# Email argument
if [ -z "$EMAIL" ]; then
  EMAIL_ARG="--register-unsafely-without-email"
  echo "WARNING: Running without email. You won't receive renewal notices."
else
  EMAIL_ARG="--email $EMAIL"
fi

docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $STAGING_ARG \
    $EMAIL_ARG \
    $DOMAIN_ARGS \
    --rsa-key-size $RSA_KEY_SIZE \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx..."
docker compose exec nginx nginx -s reload

echo "### Done! SSL certificates have been obtained."
echo ""
echo "To enable HSTS, edit nginx/conf.d/portfolio.conf and uncomment the HSTS header."
