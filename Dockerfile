# Latest Debian
FROM debian:latest

# Update, Upgrade & install SSH
RUN apt-get update -y && apt-get upgrade -y && apt-get install -y openssh-server
# Create directory SSH
RUN mkdir /var/run/sshd && chmod 755 /var/run/sshd
# Create USER with password
RUN useradd -m -p hollywood stagiaire
# Create flag.txt and write data on it
RUN cd /home/stagiaire/ && touch flag.txt && echo "FL4G-SSH-SUC355" > flag.txt 

# Port 22
EXPOSE 22

# Start automatically SSH Service
CMD ["/usr/sbin/sshd", "-D"] 