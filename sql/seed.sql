INSERT INTO users(name,email,password,role)
VALUES
(
'Ikhmal',
'ikhmal@example.com',
'$2b$10$8D0vYl6SMmXfXoWQf2Ww5ekc4h4Zb0P4A7lJ3u7S3lK0M6zXn8S6S',
'admin'
);

INSERT INTO weddings(user_id,partner_name,wedding_date,budget,location)
VALUES
(1,'Nur Aisyah','2027-06-12',50000,'Johor Bahru');

INSERT INTO checklist(wedding_id,title,category,due_date,status)
VALUES
(1,'Book Wedding Hall','Venue','2026-12-01','Completed'),
(1,'Hire Photographer','Vendor','2027-01-15','Pending'),
(1,'Wedding Invitation','Printing','2027-03-01','Pending');

INSERT INTO vendors(wedding_id,name,service,phone,email)
VALUES
(1,'Elegant Hall','Venue','0123456789','hall@example.com'),
(1,'Capture Studio','Photography','0131111111','photo@example.com'),
(1,'Flora Deco','Decoration','0142222222','deco@example.com');

INSERT INTO payments(vendor_id,amount,due_date,status)
VALUES
(1,15000,'2026-12-10','Paid'),
(2,5000,'2027-04-01','Pending'),
(3,4000,'2027-04-15','Pending');

INSERT INTO expenses(wedding_id,category,amount,expense_date,notes)
VALUES
(1,'Deposit',10000,CURRENT_DATE,'Venue deposit'),
(1,'Decoration',1500,CURRENT_DATE,'Flower decoration');

INSERT INTO guests(wedding_id,name,phone,status,table_no)
VALUES
(1,'Ahmad','0122222222','Confirmed',1),
(1,'Ali','0133333333','Pending',NULL),
(1,'Siti','0144444444','Confirmed',2);

INSERT INTO documents(wedding_id,name,file_url,status)
VALUES
(1,'Marriage Form','uploads/form.pdf','Submitted'),
(1,'IC Copy','uploads/ic.pdf','Approved');

INSERT INTO reminders(wedding_id,title,due_date,status)
VALUES
(1,'Pay Photographer',
CURRENT_TIMESTAMP + INTERVAL '30 days',
'Pending');