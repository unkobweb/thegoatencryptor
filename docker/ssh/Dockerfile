# Latest Debian
FROM debian:latest

# Update, Upgrade & install SSH
RUN apt-get update -y && apt-get upgrade -y && apt-get install -y openssh-server && rm -rf /var/lib/apt/lists/*

# Create directory SSH
RUN mkdir -p /var/run/sshd && sed -i "s/UsePrivilegeSeparation.*/UsePrivilegeSeparation no/g" /etc/ssh/sshd_config \
  && sed -i 's/PermitRootLogin without-password/PermitRootLogin no/' /etc/ssh/sshd_config \
  && touch /root/.Xauthority \
  && true

# Create USER with password
RUN useradd stagiaire \
        && echo stagiaire:hollywood | chpasswd \
        && mkdir /home/stagiaire \
        && addgroup stagiaire staff \
        && addgroup stagiaire sudo \
        && true

# Create flag.txt and write data on it
RUN cd /home/stagiaire/ && touch flag.txt && echo "FL4G-SSH-SUC355" > flag.txt

# Port 22
EXPOSE 22

# Start automatically SSH Service
CMD ["/usr/sbin/sshd", "-D"]
