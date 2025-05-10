CREATE table products(
  id text primary key,
  title text,
  price float,
  description text,
  category text,
  image text,
  count int
)

CREATE table payment(
  paymentId text primary key ,
  orderId text ,
  paymentStatus text ,
  paymentMethod text
)

CREATE table orders(
  orderId text primary key ,
  productId text ,
  userId text ,
  totalPrice float,
  status text
)

CREATE table cartitem(
  cartId text primary key,
  userId text,
  productId text
)

INSERT INTO products (id, title, price, description, category, image, count) VALUES
('1', 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 109.95, 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', 'men''s clothing', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', 120),
('2', 'Mens Casual Premium Slim Fit T-Shirts ', 22.3, 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.', 'men''s clothing', 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', 259),
('3', 'Mens Cotton Jacket', 55.99, 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.', 'men''s clothing', 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', 500),
('4', 'Mens Casual Slim Fit', 15.99, 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.', 'men''s clothing', 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', 430),
('5', 'John Hardy Women''s Legends Naga Gold & Silver Dragon Station Chain Bracelet', 695, 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean''s pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.', 'jewelery', 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', 400),
('6', 'Solid Gold Petite Micropave ', 168, 'Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.', 'jewelery', 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', 70),
('7', 'White Gold Plated Princess', 9.99, 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine''s Day...', 'jewelery', 'https://fakestoreapi.com/img/71ya6Uc0HUL._AC_UL640_QL65_ML3_.jpg', 400),
('8', 'Pierced Owl Rose Gold Plated Stainless Steel Double', 10.99, 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel', 'jewelery', 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', 100),
('9', 'WD 2TB Elements Portable External Hard Drive - USB 3.0 ', 64, 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatible with Windows 7, 8, 10; Mac OS (requires reformatting)', 'electronics', 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', 203),
('10', 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 109, 'Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance, making it ideal for typical PC workloads', 'electronics', 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', 470),
('11', 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5', 109, '3D NAND flash are applied to deliver high transfer speeds. Remarkable transfer performance, enabling faster boot up and improved overall system performance.', 'electronics', 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg', 319),
('12', 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive', 114, 'Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity', 'electronics', 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg', 400),
('13', 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin', 599, '21. 5 inches Full HD (1920 x 1080) widescreen IPS display and Radeon free sync technology. Response time: 4ms. Refresh rate: 75Hz using HDMI port. Brightness: 250 nits. Zero-frame design; ultra-thin; HDMI & VGA ports', 'electronics', 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg', 250),
('14', 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ', 999.99, '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side. Quantum dot (QLED) technology, HDR support and factory calibration provides stunningly realistic and accurate color and contrast', 'electronics', 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg', 140),
('15', 'BIYLACLESEN Women''s 3-in-1 Snowboard Jacket Winter Coats', 56.99, 'Note:The Jackets is US standard size, Please choose size as your usual wear. Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece.', 'women''s clothing', 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg', 120),
('16', 'Lock and Love Women''s Removable Hooded Faux Leather Moto Biker Jacket', 29.95, '100% POLYURETHANE (shell) 100% POLYESTER (lining) 75% POLYESTER 25% COTTON (sweater), Faux leather material for style and comfort. 2 pockets of front, asymmetric zipper design, faux leather fabric, long sleeves', 'women''s clothing', 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg', 340),
('17', 'Rain Jacket Women Windbreaker Striped Climbing Raincoats', 39.99, 'Lightweight perfect for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lining. Waterproof Rain Jacket is breathable and comfortable. It''s a good choice for the trip or casual wear.', 'women''s clothing', 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg', 679),
('18', 'MBJ Women''s Solid Short Sleeve Boat Neck V ', 9.85, '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem', 'women''s clothing', 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg', 130),
('19', 'Opna Women''s Short Sleeve Moisture', 7.95, '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away', 'women''s clothing', 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg', 146),
('20', 'DANVOUY Womens T Shirt Casual Cotton Short', 12.99, '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch.', 'women''s clothing', 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg', 145);


INSERT INTO products (id, title, price, description, category, image, count) VALUES
('21', 'Classic white T-shirt', 19.99, 'Comfortable white cotton T-shirt perfect for everyday wear', 'women''s clothing', 'https://images.unsplash.com/photo-1585386959984-a4155222f7f1', 150),
('22', 'Blue Jeans', 49.99, 'Slim-fit blue jeans perfect for any occasion.', 'women''s clothing', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246', 80),
('23', 'Red Hooded Jacket', 59.99, 'Warm red hooded jacket perfect for cold weather.', 'women''s clothing', 'https://images.unsplash.com/photo-1602810316688-5c8b1f0f9f9d', 60),
('24', 'Black sweatpants', 39.99, 'Comfortable black sweatpants perfect for working out or relaxing.', 'women''s clothing', 'https://images.unsplash.com/photo-1618354691214-0c7f9e4b1b8e', 120),
('25', 'Grey Hoodie', 44.99, 'Soft grey hoodie perfect for everyday wear.', 'women''s clothing', 'https://images.unsplash.com/photo-1618354691214-0c7f9e4b1b8e', 90);

INSERT into users (userid,account,email,password,phone)values
('U0000001','testUser1','testUser1@gmail.com','00000000','0912123123')
delete from users where userid='U0000001'
update users set account='testUser2' where userid='U0000001' 


INSERT into cartitem (cartid,userid,productid)values
('C0000001','U0000001','P0000001')
delete from cartitem where userid='U0000001'
SELECT * FROM cartitem where userid='U0000001'

insert into orders (orderid,userid,productid,totalprice,status,paymentmethod)values
('OR0000001','U0000001','P0000001',34.5,'IsActive','貨到付款')
delete from orders where orderid='OR0000001'
update orders set status='信用卡' where orderid='OR0000001'


