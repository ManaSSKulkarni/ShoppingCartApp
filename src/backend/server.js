const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const nodemailer = require("nodemailer");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});


app.post("/check-user", async (req, res) => {

    try {

        const { email } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if(result.rows.length > 0){
            return res.json({
                exists: true,
                user: result.rows[0]
            });
        }

        res.json({
            exists: false
        });

    } catch(err){
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }

});

  app.post("/users", async (req, res) => {

    try {

        console.log(req.body);

        const { name, email, phone } = req.body;

        const result = await pool.query(
            `
            INSERT INTO users(name,email,phone)
            VALUES($1,$2,$3)
            RETURNING *
            `,
            [name,email,phone]
        );

        res.json(result.rows[0]);

    } catch(err){
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }

});



app.get("/orders/:userid", async (req, res) => {

    try {

        const { userid } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM orders
            WHERE userid = $1
            ORDER BY orderdate DESC
            `,
            [userid]
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Server Error"
        });

    }

});


app.post("/place-order", async (req, res) => {

    try {

        // 1. Get data from React
        const { userid, cartitems, totalcost } = req.body;

        // 2. Fetch user details (email, name, phone)
        const userResult = await pool.query(
            "SELECT * FROM users WHERE userid = $1",
            [userid]
        );

        const user = userResult.rows[0];

        // 3. Save order in database
        const result = await pool.query(
            `
            INSERT INTO orders
            (
                userid,
                cartitems,
                totalcost,
                orderdate
            )
            VALUES
            (
                $1,
                $2,
                $3,
                NOW()
            )
            RETURNING *
            `,
            [
                userid,
                JSON.stringify(cartitems),
                totalcost
            ]
        );

        // 4. Get inserted order
        const order = result.rows[0];

        // CREATE EMAIL CONTENT

        const itemsHtml = cartitems.map(item => `
            <tr>
                <td>${item.product.title}</td>
                <td>${item.quantity}</td>
                <td>₹${item.product.price}</td>
                <td>₹${(item.product.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join("");

        const html = `
            <h2>Thank you for shopping with myCart (by Manas Kulkarni)!</h2>

            <p>Hello <b>${user.name}</b>,</p>

            <p>Your order has been placed successfully.</p>

            <p>
                <b>Order ID:</b> ${order.orderid}<br>
                <b>Order Date:</b> ${new Date(order.orderdate).toLocaleString()}
            </p>

            <table border="1" cellspacing="0" cellpadding="8">
                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>

                ${itemsHtml}

            </table>

            <h3>Total Amount : ₹${totalcost.toFixed(2)}</h3>

            <p>Thank you for shopping with MyCart ❤️</p>
        `;

        // SEND EMAIL

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: user.email,

            subject: `Sample Mail :- myCart Invoice #${order.orderid} (by Manas Kulkarni)`,

            html: html

        });

        // 5. Return order to React
        res.json(order);

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            error: "Server Error"
        });

    }

});



transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email server is ready.");
    }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
