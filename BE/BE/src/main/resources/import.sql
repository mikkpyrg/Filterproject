insert into filters(name) values ('1'), ('2');

insert into criteria (filter_id, type, sub_type, amount, date, title) select ID, 0, 0, 12, null, '' from filters where name = '1';

insert into criteria (filter_id, type, sub_type, amount, date, title) select ID, 0, 0, 0, null, 'cat' from filters where name = '2';