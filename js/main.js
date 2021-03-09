// урок на понимании функций - конструкторов

function User(name, id) { //функция - конструктор
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function(){  // метод hello
        console.log(`Hello ${this.name}`);  // в данном примере this будет ссылаться на объект.имя
    };
}

const ivan = new User('Ivan', 28);  // создаем новую переменную, и заносим ее в нашу функцию-конструтор
ivan.hello(); // Вызываем метод функции конструктора, в консоль выведется: HelloIvan
console.log(ivan); // выведется объект {имя, возраст, человек:правда}

User.prototype.exit = function() { // добавляем метод в нашу функцию-конструктор
    console.log(`${this.name} is gone`);
}
ivan.exit();

'use strict'

function count(num) { // обычная функция умножения
    return this*num;
}
const double = count.bind(2); // метод bind позволяет нам задать значение this

console.log(double(3)); // выводим значение переменной дабл(которая ссылается на функцию со значением this = 2) аргументом задаем значение в скобках

btn.addEventListener('click', function() { // в этом случае контекстом(this) будет являться элемент(тобишь в нашем случае кнопка)
    console.log(this);
    this.style.backgroundColor = 'red'; // через контекст можно обращаться к стилям объекта
});

const obj = {
    num: 5,
    sayNumber: function() {
        const say = () => { // в стрелочных функциях нет своего контекста, поэтому this берет значение своего родителя
            console.log(this);// следовательно получается  this берется от метода sayNumber который ссылается на объект в котором он находится
        };
        say();
    }
};

obj.sayNumber();