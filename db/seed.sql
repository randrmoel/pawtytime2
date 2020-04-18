use dogwalk;

insert into dogowner 
    (firstName, lastName, address1, address2, city, st, zip5, lat, lng, username, pw, dateAdded)
values 
    ("Peter", "Parker", "1200 Main St", "", "Gotham", "NY", 10023, 40.593341, -73.964436,"pparker", "soisl29", now()), /*id 1*/
    ("Gary", "Harland", "95 Glendale Blvd", "Apt 3B", "Brooklyn", "NY", 10099, 40.593129, -73.966786, "gary105", "223ddd0", now()),/*id 2*/
    ("Carlton", "Brown", "12022 W 45th St", "Apt 9", "Queens", "NY", 10833, 40.595581, -73.966496, "heman22", "2*7)33pp", now()); /*id 3*/
    

insert into dog
    (dogOwnerId, dogName, breed, breedUrl, dateAdded)
values
    (1, "Fido", "Mixed Breed", "", now()),
    (1, "Rover", "Golden Retriever", "https://dog.ceo/api/breed/Golden Retriver/images/random", now()),
    (2, "Pepe", "Cairn Terrier", "https://dog.ceo/api/breed/Cairn", now()),
    (3, "King", "Great Dane", "https://dog.ceo/api/breed/Great Dane/images/random", now());

insert into dogwalker 
    (firstName, lastName, address1, address2, city, st, zip5, lat, lng, username, pw, dateAdded)
values
    ("Ed", "Walker", "1101 Pedergast Ave", "", "Mill Basin", "NY", 10100, 40.593528, -73.962784, "ewalker1011", "10dd20ee", now()), /*id 1*/
    ("Jim", "Stroller", "18 Dewberry Way", "Jamaica", "NY", 11022, 40.591703, -73.968073, "iwalkem", "ppingrass99", now()), /*id 2*/
    ("Jason", "Promanader", "2601 Winchester St", "The Bronx", "NY", 12301, 40.591443, -73.962440, "leashman", "ipickup#2", now()); /*id 3*/

insert into appmnt
    (dogwalkerId, walkDate, timeSlot, dogUser, dateAdded)
values
    (1, "2020-04-15", "13:00:00", 0, now()),
    (1, "2020-04-15", "13:30:00", 0, now()),
    (1, "2020-04-15", "14:00:00", 0, now()),
    (2, "2020-05-12", "09:00:00", 0, now()),
    (2, "2020-05-12", "09:30:00", 0, now()),
    (3, "2020-04-15", "13:00:00", 0, now()),
    (3, "2020-04-15", "13:30:00", 0, now()),
    (3, "2020-04-15", "14:00:00", 0, now()),
    (3, "2020-05-01", "09:00:00", 1, now()),
    (2, "2020-05-01", "09:00:00", 2, now());