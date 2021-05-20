export const STATIC_CONFIGS = {
    DB_DSL_STATIC : "mongodb://mongodb:27017/projet_fl1",
    _SERVER_HOST_STATIC : "localhost",
    _SERVER_PORT_STATIC : 8089,
    USER_SECRET_STATIC : "my_user_secret",
    USERMOBILE_SECRET_KEY_STATIC: "my_usermobile_secret"
}

export const ERROR_MESSAGES_EN = {
    1:  "internal error! please contact your admin (find the err message in the server logs",
    2:  "Database connection error ## ",
    9:  "equipement not found !!",
    10: "id equipement wasn't provided !!",
    11: "please verify your inputs !",
    12: "this account exists already, please contact your admin to activate it.",
    13: "this account exists already, please try to log in.",
    14: "database error !! please demand the error log from your back-dev team !",
    15: "username or password is incorrect !! ",
    16: "this account is not acctived yet! please contact your admin !",
    17: "wrong token !",
    18: "error!! please provide the token on your request",
    19: "Please verify the syntax of your request !!",
}

export const SUCCESS_MESSAGES_EN = {
    2: "database is connected",
    20: "login successed",
    21: "Server connected to Database with DSL",
}