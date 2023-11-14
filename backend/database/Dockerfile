FROM mysql:8.0.35

MAINTAINER pinya
EXPOSE 3306

RUN chown -R mysql:root /var/lib/mysql/

ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

COPY ./setup.sh setup.sh
COPY ./init.sql /docker-entrypoint-initdb.d
COPY ./createTable.sql createTable.sql

# RUN mysql -u root -p

# RUN service mysql restart
# RUN echo $(service mysql status)
# CMD ["sh", "setup.sh"]
# CMD ["sh", "/backend/database/setup.sh"]
# CMD ["sh", "/bin/bash"]