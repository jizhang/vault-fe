create table extract_table (
  id int primary key auto_increment
  ,source_instance int not null
  ,source_database varchar(255) not null
  ,source_table varchar(255) not null
  ,target_instance int not null
  ,target_database varchar(255) not null
  ,target_table varchar(255) not null
  ,columns text not null
  ,create_time datetime not null
  ,update_time datetime not null
);
