const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js")

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const items = ["Running","Excercising", "Coding"];
const workItems = [];

app.get("/", (req, res) => {
    const day = date.getDate();
    res.render("list", { listTitle: day, newListItems: items });
    console.log(items);
});

app.post("/", (req, res) => {
    const item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", (req, res) => {
    console.log(workItems);
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})
app.get("/about", (req, res) => {
    res.render("about", {title: "About"})
})



app.post("/work", (req, res) => {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})







app.listen(3000, () => {
  console.log("Server started on port 3000!!!!!");
});
