// const express = require('express')
// const app = express()
// const port = 3000


// const products = ['masha', 'vasa', 'mina'];


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/product', (req, res) => {
// ЗАГОЛОВОК ДЛЯ ОТПРАВКИ НА ВСЕ ХОСТИНГИ ЗАПРОС FETCH
//     res.set('Access-Control-Allow-Origin', '*')
//     res.json({ products })
// })


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })



// -------------------------------------------------------- LESSONS KURS

// exspress js - фреймворк (node.js)

const express = require('express');
// роутер
const booksRouter = express.Router();
const app = express();



//req - данные отпр от клиента
//res - данные отправляем клиенту
//res.send - сообщение клиенту шлем - ответ

// обработка гет запросов с помощью app.get, app.put, app.delete и т.д.


const productsArray = ['Apple', 'Orange', 'Banan'];


// _________________________________________________
// отправка статических файлов - css,js,img и т.д.
// метод промежуточной обработки

// в параметр нужно передавать название каталога(папки)
// нужно делать это до вызова всех маршрутов, т.е. в начале документа!
app.use(express.static('public'));
// Отрисовка страницы

// чтобы менять путь под свой и отдавать статический путь
// app.use('/static', express.static(__dirname + '/public'));
// _________________________________________________




// 1-й аргумент строка- путь 2-й аргумент каллбек
app.get('/', (req, res, next) => {

    res.send('its working2');

})

// 2-й запрос роутер
app.get('/products', (req, res, next) => {
    // query параметры в адресной строке ?page=0 
    // console.log(req.query.page);


    res.send(productsArray);
})


// Отправка JSON файла

app.get('/products-json', (req, res, next) => {
    // next(); - middlewere - промежуточная обработка
    res.json({ productsArray });
    // Content-Type: application/json; charset=utf-8
})


// установка статус кодов от сервера и вывод динамических данных по ID
// /products/:id на подобие как во vue router с динамическими маршрутами
app.get('/products/:id', (req, res, next) => {
    // cмотрим в массиве номер индекса 0,1,2 если введем не существующий элемент, выдаст 404 ошибку
    if (productsArray[req.params.id]) {
        res.send(productsArray[req.params.id]);
    } else {
        res.status(404).send('Product not found');
    }

})

// _________________________________________________
// booksRouter Routers

// http://localhost:5000/books/
booksRouter.get('/', (req, res) => {
    res.send('main page books')
})
// http://localhost:5000/books/about
booksRouter.get('/about', (req, res) => {
    res.send('about page books')
})

// подсоеденяем маршруты в главный роут 
app.use('/books', booksRouter);
// _________________________________________________

// получение значений из массива по index-у
// http://localhost:5000/products/1
app.get('/products/:id', (req, res, next) => {
    res.send(productsArray[req.params.id]);
})


// Редирект
app.get('/blog', (req, res, next) => {
    // res.redirect('https://yandex.ru/');
    // на главную страницу 
    res.redirect('/')
    // res.redirect(301,'/') 1-й аргумент номер статуса
})


// Отправка файлов
// res.download('./public/books.html')  - где должен лежать отправляемый файл
app.get('/getDownloadBooks', (req, res, next) => {
    // кастомное название файла можно задать во втором аргументе
    res.download('./public/books.html', 'onothername', (err) => {
        console.log('file отправился');
    });
});






//server

app.listen(5000, () => {
    console.log('its starget', new Date())
})