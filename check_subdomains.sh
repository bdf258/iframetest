#!/bin/bash
# Check caseworker subdomains for validity

INPUT_FILE="/home/user/iframetest/caseworker_subdomains.csv"
OUTPUT_FILE="/home/user/iframetest/subdomain_check_results.csv"

# Create output file with header
echo "country,first_name,last_name,subdomain,full_url,status_code,result" > "$OUTPUT_FILE"

# Skip header line and process each row
tail -n +2 "$INPUT_FILE" | while IFS=',' read -r country first_name last_name subdomain full_url; do
    # Make HTTP request and get status code
    status_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://${full_url}/" 2>/dev/null)
    
    # Determine result
    if [ "$status_code" = "200" ]; then
        result="OK"
    elif [ "$status_code" = "404" ]; then
        result="NOT_FOUND"
    elif [ "$status_code" = "000" ]; then
        result="CONNECTION_ERROR"
    else
        result="OTHER_${status_code}"
    fi
    
    echo "${country},${first_name},${last_name},${subdomain},${full_url},${status_code},${result}"
    echo "${country},${first_name},${last_name},${subdomain},${full_url},${status_code},${result}" >> "$OUTPUT_FILE"
    
    # Rate limit: 1 request per second
    sleep 1
done

echo ""
echo "Results saved to: $OUTPUT_FILE"
