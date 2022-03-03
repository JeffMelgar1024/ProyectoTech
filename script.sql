create table if not EXISTS users( 
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(50) NOT NULL,
	phone varchar(8),
	username varchar(50) NOT NULL,
	born varchar(10),
	email varchar(50) NOT NULL,
	password varchar(200) NOT NULL
);

create table if not EXISTS product(
    id int AUTO_INCREMENT PRIMARY key,
	SKU varchar(50),
    name varchar(50) NOT NULL,
    amount int NOT NULL,
    price DOUBLE NOT null,
    description varchar(200),
 	image varchar(300)
);

INSERT INTO `users` (`id`, `name`, `phone`, `username`, `born`, `email`, `password`) VALUES
(5, 'Jeff Melgar', '12345678', 'jeff1024', '27/05/1997', 'jeff.melgar1024@gmail.com', 'jeff1024'),
(7, 'Tanner Prince', '5393245', 'Elliott_1234', '23/04/2021', 'tannerprince@bezal.com', 'abd244C'),
(8, 'Kari Kent', '4513122', 'Caitlin_1234', '15/07/2015', 'karikent@bezal.com', 'HolaMundo'),
(9, 'Samantha Valentine', '4043801', 'Stuart_1234', '26/08/2020', 'samanthavalentine@bezal.com', 'gyatc12'),
(10, 'Mejia Cruz', '5753784', 'Powers_1234', '10/07/2016', 'mejiacruz@bezal.com', 'muda124');