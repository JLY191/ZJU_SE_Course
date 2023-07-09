IF OBJECT_ID('dbo.borrow', 'U') IS NOT NULL DROP TABLE dbo.borrow;
IF OBJECT_ID('dbo.book', 'U') IS NOT NULL DROP TABLE dbo.book;
IF OBJECT_ID('dbo.card', 'U') IS NOT NULL DROP TABLE dbo.card;

create table book (
    book_id int not null identity,
    category varchar(63) not null,
    title varchar(63) not null,
    press varchar(63) not null,
    publish_year int not null,
    author varchar(63) not null,
    price decimal(7, 2) not null default 0.00,
    stock int not null default 0,
    primary key (book_id),
    unique (category, press, author, title, publish_year)
);

create table card (
    card_id int not null identity,
    name varchar(63) not null,
    department varchar(63) not null,
    type char(1) not null,
    primary key (card_id),
    unique (department, type, name),
    check ( type in ('T', 'S') )
);

create table borrow (
    card_id int not null,
    book_id int not null,
    borrow_time bigint not null,
    return_time bigint not null default 0,
    primary key (card_id, book_id, borrow_time),
    foreign key (card_id) references card(card_id) on delete cascade on update cascade,
    foreign key (book_id) references book(book_id) on delete cascade on update cascade
);