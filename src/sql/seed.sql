insert into "Users" (username, discriminator, "createdAt", "updatedAt")
values 
('JohnDoe10', '1010', '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200'),
('JohnDoe11', '1111', '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200'),
('JohnDoe12', '1212', '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200'),
('JohnDoe13', '1313', '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200'),
('JohnDoe14', '1414', '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200');

insert into "Players" (battletag, discriminator, level, "createdAt", "updatedAt", "userId") 
values
('Player10', 1010, null, '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200', (select id from "Users" where username='JohnDoe10')),
('Player11', 1111, 11, '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200', (select id from "Users" where username='JohnDoe11')),
('Player12', 1212, 12, '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200', (select id from "Users" where username='JohnDoe12')),
('Player13', 1313, 13, '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200', (select id from "Users" where username='JohnDoe13')),
('Player14', 1414, 14, '2023-05-12 18:42:50.375 +0200', '2023-05-12 18:42:50.375 +0200', (select id from "Users" where username='JohnDoe14'))