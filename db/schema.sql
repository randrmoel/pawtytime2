create database dogwalk;

use dogwalk;

/*actortype true for owner, false for walker*/
create table dogactor (
    id int not null auto_increment,
	actortype boolean not null,
	firstName varchar(25) not null,
	lastName varchar(25) not null,
	address1 varchar(50) not null,
	address2 varchar(50),
	city varchar(15) not null,
	st enum("AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY") not null,
	phone int not null,
	phoneType enum("landline", "mobile"),
	zip5 int not null,
	lat decimal(10,3),
	lng decimal(10,3), 
	username varchar(20),
	pw varchar(25),
	dateAdded datetime,
	dateUpdated datetime default now() on update now(),
    primary key (id)
);


/*create table dogowner (
    id int not null auto_increment,
	firstName varchar(25) not null,
	lastName varchar(25) not null,
	address1 varchar(50) not null,
	address2 varchar(50),
	city varchar(15) not null,
	st enum("AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY") not null,
	phone int not null,
	phoneType enum("landline", "mobile"),
	zip5 int not null,
	lat decimal(10,3),
	lng decimal(10,3), 
	username varchar(20),
	pw varchar(25),
	dateAdded datetime,
	dateUpdated datetime default now() on update now(),
    primary key (id)
);
*/
create table dog (
   	id int auto_increment not null,
	dogactorId int not null,
	dogName varchar(25) not null,
	breed varchar(25) not null,
	breedUrl varchar(50),
    dateAdded datetime,
	dateUpdated datetime default now() on update now(),
    primary key (id)
);

/*
create table  dogwalker (
    id int not null auto_increment,
	firstName varchar(25) not null,
	lastName varchar(25) not null,
	address1 varchar(50) not null,
	address2 varchar(50),
	city varchar(15) not null,
	st enum("AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY") not null,
	zip5 int,
	phone int not null,
	phoneType enum("landline", "mobile"),
	lat decimal(10,3),
	lng decimal(10,3),
	username varchar(20),
	pw varchar(25),
	dateAdded datetime,
	dateUpdated datetime default now() on update now(),
    primary key (id)
);
*/
create table appmnt(
	dogwalkerId int not null,
	walkDate date not null,
	timeSlot time not null,
	dogUser int default 0 not null, /*This is the dog id or zero, if zero then available*/
    dateAdded datetime,
	dateUpdated datetime default now() on update now(),
    primary key(dogwalkerid, walkdate, timeslot)
);