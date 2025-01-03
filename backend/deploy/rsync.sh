rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' --exclude 'frontend' \
-e "ssh -i ~/.ssh/vehicle_dashboard_key_pair.pem" \
. ubuntu@ec2-3-131-101-58.us-east-2.compute.amazonaws.com:~/app