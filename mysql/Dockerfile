FROM mysql
ENV LC_ALL=C.UTF-8
COPY initialize.sql /docker-entrypoint-initdb.d/
COPY csv_file/final_data.csv /var/lib/mysql_files/
COPY csv_file/category.csv /var/lib/mysql_files/

ADD ./my.cnf /etc/mysql/conf.d/my.cnf