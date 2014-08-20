#!/bin/bash

# add mirrors for faster download
cat >/tmp/sources.list <<EOL
deb mirror://mirrors.ubuntu.com/mirrors.txt precise main restricted universe multiverse
deb mirror://mirrors.ubuntu.com/mirrors.txt precise-updates main restricted universe multiverse
deb mirror://mirrors.ubuntu.com/mirrors.txt precise-backports main restricted universe multiverse
deb mirror://mirrors.ubuntu.com/mirrors.txt precise-security main restricted universe multiverse
EOL

cat /etc/apt/sources.list >> /tmp/sources.list
mv /tmp/sources.list /etc/apt/sources.list

# make sure we are not asked any questions
export DEBIAN_FRONTEND=noninteractive

# update repository information
apt-get -y update

# prepare answers for prompts
echo mysql-server-5.5 mysql-server/root_password password caracal | debconf-set-selections
echo mysql-server-5.5 mysql-server/root_password_again password caracal | debconf-set-selections
echo phpmyadmin phpmyadmin/dbconfig-install boolean true | debconf-set-selections
echo phpmyadmin phpmyadmin/mysql/admin-pass password caracal | debconf-set-selections
echo phpmyadmin phpmyadmin/mysql/app-pass password caracal | debconf-set-selections
echo phpmyadmin phpmyadmin/app-password-confirm password caracal | debconf-set-selections
echo phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2 | debconf-set-selections

# install database server first
apt-get -y install mysql-server

# install the remaining part of the server stack
apt-get -y install phpmyadmin libapache2-mod-php5 php5-curl git

# clone caracal repository
cd /var/www
rm -Rf *
git clone https://github.com/Way2CU/Caracal.git .
git checkout develop

# link directories
ln -s /vagrant /var/www/site