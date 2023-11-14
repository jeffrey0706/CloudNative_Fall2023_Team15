# echo "start MySQL"

# echo `service mysql status`

# echo '1.Starting mysql...'
# service mysql start
# sleep 3
# echo `service mysql status`

# echo '2.Creating Database...'
# mysql < createDB.sql
# mysql < createTable.sql
# sleep 3
# echo '2.Database created...'


# echo '3.Initializing data...'
# mysql < initial_data.sql
# echo '3.Data initialized...'

# echo '4.Modifying privileges...'
# mysql < privileges.sql
# sleep 3
# echo '4.Privileges modified...'

# sleep 3
# echo `service mysql status`
# echo 'MySQL container started, and data initialized successfully'

# tail -f /dev/null