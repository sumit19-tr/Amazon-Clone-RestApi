# page 1
> list of category
  http://localhost:9041/catagory 
  https://amazon-clone-restapi-production.up.railway.app/catagory 

> list of product
  http://localhost:9041/product
  https://amazon-clone-restapi-production.up.railway.app/product

> get products wrt product_Id
  http://localhost:9041/product/:id
  https://amazon-clone-restapi-production.up.railway.app/product/:id

>get products wrt category_id
(GET)http://localhost:9041/products/1
     https://amazon-clone-restapi-production.up.railway.app/products/1

> list of homepage product wrt section name
  http://localhost:9041/homepageContentSection1/:section
  https://amazon-clone-restapi-production.up.railway.app/

> get multiple product wrt array of productId
  (GET)http://localhost:9041/products?product_ids=1,27,50
  https://amazon-clone-restapi-production.up.railway.app/

# page 2
> list of product wrt to category
  http://localhost:9041/filter/1
  https://amazon-clone-restapi-production.up.railway.app/filter/1

> list of category wrt id
  http://localhost:9041/catagory/1
  https://amazon-clone-restapi-production.up.railway.app/catagory/1

> list of product wrt to category & Brand
  http://localhost:9041/filter/1?brand_id=2
  https://amazon-clone-restapi-production.up.railway.app/filter/1?brand_id=2

> list of product wrt to category & Cost
  http://localhost:9041/filter/1?lprice=5000&hprice=10000
  https://amazon-clone-restapi-production.up.railway.app/filter/1?lprice=5000&hprice=10000

> list of product wrt to category & discount
  http://localhost:9041/filter/1?L_discount=30&H_discount=90
  https://amazon-clone-restapi-production.up.railway.app/filter/1?L_discount=30&H_discount=90

> list of product wrt to category & rating
  http://localhost:9041/filter/1?l_Rating=2&h_Rating=4
  https://amazon-clone-restapi-production.up.railway.app/filter/1?l_Rating=2&h_Rating=4

> list of Sort on basis of price
  http://localhost:9344/filter/1?hcost=600&lcost=100&sort=-1
  https://amazon-clone-restapi-production.up.railway.app/filter/1?hcost=600&lcost=100&sort=-1

# page 3
> details of product wrt product Id
  http://localhost:9041/details/1 
  https://amazon-clone-restapi-production.up.railway.app/details/1 

# page 4 
> order details 
  http://localhost:9041/order/1
  https://amazon-clone-restapi-production.up.railway.app/order/1

> add to cart
  POST-> http://localhost:9041/addtocart
          https://amazon-clone-restapi-production.up.railway.app/addtocart


> cart items w r t add to cart
  post-> http://localhost:9041/cartitems
  
>placeOrder
  POST->http://localhost:9041/placeOrder
  {
    "orderId" : 54135112,
    "name" : "Sumit",
    "email" : "sumit123@gmail.com",
    "address" : "hno 399",
    "phone" : 7987848362,
    "cost" : 391,
    "menuItem" : [
        12,34,23
    ]
}
res->order placed

> order list
  (GET) http://localhost:9041/viewOrders



-> items in cart
    (GET)http://localhost:9091/api/auth/cart-items


-> Add item to cart (Post api)
   http://localhost:9091/api/auth/add-id
    example=>
    body=>
    {
            "productId": 12 ,
            "Image": "https://i.ibb.co/tJ6XbT7/Redmi-Note-7-Pro.jpghttps://i.ibb.co/tJ6XbT7/Redmi-Note-7-Pro.jpg",
            "content": "Redmi Note 7 Pro (Space Black, 64GB, 4GB RAM)",
            "Price":7999,
            "Quantity": 2
        }
    response=>
    {
        "success": false,
        "msg": "Product already exists in the cart"
    }
-> remove items (delete request);
    http://localhost:9091/api/auth/removeItems/1

    {
    "success": true,
    "data": "product  removed from cart successfully"
}


-> update Quantity
 (PUT)http://localhost:9091/api/auth/updateQuantity

 {
    "Quantity":2,
    "productId":5
}

{
    "success": true,
    "msg": "Quantity updated successfully[object Object]"
}

----------------------------------------------------------------------------------------------------------------

login api

---------------------Register--------------------------------------------
(POST) > http://localhost:9091/api/auth/register
(body) => { 
    "name": "rahul kumar",
    "email":"rahul@gmail.com",
    "password":"rahul123@",
    "phone":6745389612,
    "role":"user"
}
(response) => {
    "success": true,
    "msg": "Registration succesfull"
}

--------------------Get all user--------------------------
(GET)->http://localhost:9091/api/auth/users

----------------Login-----------------------------------
(POST) => http://localhost:9091/api/auth/login
(Body) => {
    "email":"amit@gmail.com",
    "password":"amit123@"
}
(response)-> {
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTViZGMwYjFmZGI0OTEzMmE0MzMyMiIsImlhdCI6MTY4ODYzNjA1NSwiZXhwIjoxNjg4NzIyNDU1fQ.15OYdIBA7b8_EUtOs0s5doVekB-j5q87NbH9ZlvJDpk"
}

-----------------UserInfo------------------------
(GET) => http://localhost:9091/api/auth/userinfo

(Headers) => key:x-access-token value:Token value from login

(response)-> {
    "_id": "6479c03239a0a195a85b5602",
    "name": "rohit mishra",
    "email": "rohitmhr.99@gmail.com",
    "password": "$2a$08$236X.sXgx3oXBu4raSzGk.ZIFS2dsKvLs27mL1zgAH/emkpkb3fwq",
    "phone": 7987466251,
    "role": "user",
    "__v": 0
}

