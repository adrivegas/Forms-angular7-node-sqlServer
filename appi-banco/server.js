//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//Initiallising connection string
var dbConfig = {
    user: "SA",
    password: "password12345",
    server: "localhost",
    database: "Clientesbanco"
};

//Function to connect to database and execute query
const executeQuery = function (res, query, parameters) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database

            parameters.forEach(function (p) {
                request.input(p.name, p.sqltype, p.value);
            });

            request.query(query, function (err, result) {
                if (err) {
                    console.log("Error al correr query en la base: " + err);
                    res.send(err);
                }
                else {
                    // res.json({
                    //     message: 'Registro almacenado'
                    // })
                    res.send(result);
                    sql.close();
                }
            });
        }
    });
}

// //GET API
app.get('/api/user', function (req, res) {
    sql.connect(dbConfig, function () {
        var request = new sql.Request();
        request.query('select * from [user]', function (err, recordset) {
            if (err) console.log(err);
            res.json(recordset)
        });
    });
})

app.get('/api/credito', function (req, res) {
    sql.connect(dbConfig, function () {
        var request = new sql.Request();
        request.query('select * from [credito]', function (err, recordset) {
            if (err) console.log(err);
            res.json(recordset)
        });
    });
})

//POST API
app.post("/api/user", function (req, res) {
    var parameters = [
        { name: 'Identificacion', sqltype: sql.VarChar, value: req.body.Identificacion },
        { name: 'Nombres', sqltype: sql.VarChar, value: req.body.Nombres },
        { name: 'FechaNacimiento', sqltype: sql.VarChar, value: req.body.FechaNacimiento },
    ];
    var query = "INSERT INTO [user] (Identificacion,Nombres,FechaNacimiento)  VALUES (@Identificacion, @Nombres, @FechaNacimiento)";
    executeQuery(res, query, parameters);
    // res.json({
    //     message: 'Registro almacenado'
    // })
});


app.post("/api/credito", function (req, res) {
    var parameters = [
        { name: 'NombreEmpresa', sqltype: sql.VarChar, value: req.body.NombreEmpresa },
        { name: 'NIT', sqltype: sql.VarChar, value: req.body.NIT },
        { name: 'salario', sqltype: sql.Money, value: req.body.salario },
        { name: 'fechaIngreso', sqltype: sql.VarChar, value: req.body.fechaIngreso },
        { name: 'Identificacion', sqltype: sql.VarChar, value: req.body.Identificacion },

    ];
    var query = "INSERT INTO [credito] (NombreEmpresa,NIT,salario,fechaIngreso,Identificacion)  VALUES (@NombreEmpresa,@NIT,@salario,@fechaIngreso,@Identificacion)";
    executeQuery(res, query, parameters);
    // res.json({
    //     message: 'Registro almacenado'
    // })
});

//PUT API
app.put("/api/user/:id", function (req, res) {
    var parameters = [
        { name: 'Identificacion', sqltype: sql.VarChar, value: req.body.Identificacion },
        { name: 'Nombres', sqltype: sql.VarChar, value: req.body.Nombres },
        { name: 'FechaNacimiento', sqltype: sql.VarChar, value: req.body.FechaNacimiento },
    ];
    var query = "UPDATE [user] SET Identificacion = @Identificacion, Nombres=  @Nombres ,FechaNacimiento = @FechaNacimiento WHERE Identificacion =" + req.params.id;
    executeQuery(res, query, parameters);
});

// DELETE API
app.delete("/api/user/:id", function (req, res) {
    var parameters = [
        { name: 'Identificacion', sqltype: sql.VarChar, value: req.params.id },
    ];
    var query = "DELETE FROM  [user] WHERE Identificacion= @Identificacion";
    console.log(query)
    executeQuery(res, query, parameters);
});
