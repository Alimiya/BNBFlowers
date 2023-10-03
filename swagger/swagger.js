const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'REST API',
            description: 'API Documentation',
            version: '2.0.0',
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                in: 'header',
                name: 'Authorization',
                description: 'Bearer Token',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security:[
        {
            bearerAuth: [],
        },
    ],
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

swaggerSpec.paths = {
    '/api/auth/register': {
        post: {
            summary: 'Регистрация пользователя',
            tags:["Authentication"],
            description: 'Регистрация нового пользователя с использованием имени, фамилии, электронной почты, номера, пароля, и адреса кошелька.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                fname: {
                                    type: 'string',
                                    example: 'John'
                                },
                                lname: {
                                    type: 'string',
                                    example: 'Doe'
                                },
                                email: {
                                    type: 'string',
                                    example: 'johndoe@example.com'
                                },
                                phone: {
                                    type: 'number',
                                    example: '88005553535'
                                },
                                password: {
                                    type: 'string',
                                    example: 'securepassword'
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Пользователь успешно создан',
                },
                400: {
                    description: 'Ошибка валидации или пользователь уже существует',
                },
                500: {
                    description: 'Внутренняя ошибка сервера',
                },
            },
        },
    },
    '/api/auth/login': {
        post: {
            summary: 'Авторизация пользователя',
            tags:["Authentication"],
            description: 'Авторизация пользователя с использованием электронной почты и пароля.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    example: 'johndoe@example.com'
                                },
                                password: {
                                    type: 'string',
                                    example: 'securepassword'
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Успешная авторизация.',
                },
                400: {
                    description: 'Некорректный email или пароль.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
    '/api/users': {
        get: {
            summary: 'Получить список всех пользователей',
            tags:["Users"],
            description: 'Получить список всех пользователей. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            responses: {
                200: {
                    description: 'Список пользователей успешно получен.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        post: {
            summary: 'Создать нового пользователя',
            tags:["Users"],
            description: 'Создать нового пользователя. Требуется аутентификация.',
            security: [{ bearerAuth: [], ApiKeyAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                fname: {
                                    type: 'string',
                                    example: 'John'
                                },
                                lname: {
                                    type: 'string',
                                    example: 'Doe'
                                },
                                email: {
                                    type: 'string',
                                    example: 'johndoe@example.com'
                                },
                                phone: {
                                    type: 'number',
                                    example: '88005553535'
                                },
                                password: {
                                    type: 'string',
                                    example: 'securepassword'
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Пользователь успешно создан.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
    '/api/users/{id}': {
        get: {
            summary: 'Получить информацию о пользователе по ID',
            tags:["Users"],
            description: 'Получить информацию о пользователе по указанному ID. Требуется аутентификация. ',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID пользователя',
                },
            ],
            responses: {
                200: {
                    description: 'Информация о пользователе успешно получена.',
                },
                404: {
                    description: 'Пользователь не найден.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        put: {
            summary: 'Обновить информацию о пользователе по ID',
            tags:["Users"],
            description: 'Обновить информацию о пользователе по указанному ID. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID пользователя',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                fname: {
                                    type: 'string',
                                    example: 'John'
                                },
                                lname: {
                                    type: 'string',
                                    example: 'Doe'
                                },
                                email: {
                                    type: 'string',
                                    example: 'johndoe@example.com'
                                },
                                phone: {
                                    type: 'number',
                                    example: '88005553535'
                                },
                                password: {
                                    type: 'string',
                                    example: 'securepassword'
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Информация о пользователе успешно обновлена.',
                },
                404: {
                    description: 'Пользователь не найден.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        delete: {
            summary: 'Удалить пользователя по ID',
            tags:["Users"],
            description: 'Удалить пользователя по указанному ID. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID пользователя',
                },
            ],
            responses: {
                200: {
                    description: 'Пользователь успешно удален.',
                },
                404: {
                    description: 'Пользователь не найден.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },

    '/api/users/orders/{id}': {
        get: {
            summary: 'Заказы пользователя по ID',
            tags:["Users"],
            description: 'Получение заказов пользователя по ID. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID пользователя',
                },
            ],
            responses: {
                200: {
                    description: 'Список заказов успешно получен.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
    '/api/flowers': {
        get: {
            summary: 'Получить список всех цветов',
            tags:["Flowers"],
            description: 'Получение всех цветов. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            responses: {
                200: {
                    description: 'Список цветов успешно получен.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        post: {
            summary: 'Создать цветы',
            tags:["Flowers"],
            description: 'Создание цветов. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    example: 'Rose'
                                },
                                description: {
                                    type: 'string',
                                    example: 'Red'
                                },
                                price: {
                                    type: 'number',
                                    example: '50'
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Цветы были успешно добавлены.',
                },
                404: {
                    description: 'Такие цветы уже существуют.'
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        }
    },
    '/api/flowers/{id}': {
        get: {
            summary: 'Получить информацию о цветах по ID',
            tags:["Flowers"],
            description: 'Получить информацию о цветах по указанному ID. Требуется аутентификация. ',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID цветов',
                },
            ],
            responses: {
                200: {
                    description: 'Информация о цветах успешно получена.',
                },
                404: {
                    description: 'Цветы не найдены.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        put: {
            summary: 'Обновить информацию о цветах по ID',
            tags:["Flowers"],
            description: 'Обновить информацию о цветах по указанному ID. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID цветов',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    example: 'Rose'
                                },
                                description: {
                                    type: 'string',
                                    example: 'Red'
                                },
                                price: {
                                    type: 'number',
                                    example: '50'
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Информация о цветах успешно обновлена.',
                },
                404: {
                    description: 'Цветы не найдены.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        delete: {
            summary: 'Удалить цветы по ID',
            tags:["Flowers"],
            description: 'Удалить цветы по указанному ID. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID цветов',
                },
            ],
            responses: {
                200: {
                    description: 'Цветы успешно удален.',
                },
                404: {
                    description: 'Цветы не найдены.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
    '/api/deliveries': {
        get: {
            summary: 'Получить список всех заказов',
            tags:["Deliveries"],
            description: 'Получение всех заказов. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            responses: {
                200: {
                    description: 'Список заказов успешно получен.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        post: {
            summary: 'Создать заказ',
            tags:["Deliveries"],
            description: 'Создание заказов. Требуется аутентификация.',
            security: [{ bearerAuth: []}],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                address: {
                                    type: 'string',
                                    example: 'Home'
                                },
                                cost: {
                                    type: 'number',
                                    example: '100'
                                },
                                quantity: {
                                    type: 'number',
                                    example: '50'
                                },
                                flowerId: {
                                    type: 'string',
                                    example: '123456789qwerty'
                                },
                                userId: {
                                    type: 'string',
                                    example: '123456789qwerty'
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Заказ были успешно добавлены.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        }
    },
    '/api/deliveries/{id}': {
        get: {
            summary: 'Получить информацию о заказах по ID',
            tags:["Deliveries"],
            description: 'Получить информацию о заказах по указанному ID. Требуется аутентификация. ',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID заказов',
                },
            ],
            responses: {
                200: {
                    description: 'Информация о заказах успешно получена.',
                },
                404: {
                    description: 'Заказ не найден.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
    '/api/deliveries/send/{id}': {
        get: {
            summary: 'Отправить заказ по ID',
            tags:["Deliveries"],
            description: 'Отправить заказ по указанному ID. Требуется аутентификация. ',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID заказов',
                },
            ],
            responses: {
                200: {
                    description: 'Заказ успешно отправлен.',
                },
                404: {
                    description: 'Заказ не найден.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
    '/api/deliveries/complete/{id}': {
        get: {
            summary: 'Завершить заказ по ID',
            tags:["Deliveries"],
            description: 'Завершить заказ по указанному ID. Требуется аутентификация. ',
            security: [{ bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456789qwerty'
                    },
                    description: 'ID заказов',
                },
            ],
            responses: {
                200: {
                    description: 'Заказ успешно доставлен.',
                },
                404: {
                    description: 'Заказ не найден.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
}

swaggerSpec.components = {
    schemas:{
        User:{
            type:'object',
            properties:{
                id:{type: 'objectId'},
                fname:{type: 'string'},
                lname:{type: 'string'},
                email:{type: 'string'},
                phone:{type: 'number'},
                password:{type: 'string'},
                wallet:{type: 'string'},
            },
        },
        Delivery:{
            type:'object',
            properties:{
                id:{type: 'objectId'},
                address:{type: 'string'},
                cost:{type: 'number'},
                quantity:{type: 'number'},
                userId:{type: 'objectId'},
                flowerId:{type: 'objectId'},
                status:{type: 'string', enum:["Not paid", "Paid", "In Transit", "Delivered"]},
            },
        },
        Flower:{
            type:'object',
            properties:{
                id:{type: 'objectId'},
                name:{type: 'string'},
                description:{type: 'string'},
                price:{type: 'number'},
            },
        },
    },
}

module.exports = swaggerSpec