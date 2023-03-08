module.exports.WAIT_BETWEEN_FAILED_LOGINS = 60000;
module.exports.LOGIN_ATTEMPTS_WITHOUT_WAIT = 3;
module.exports.BCRYPT_SALT = 10;
module.exports.JWT_ACCESS_TOKEN_EXPIRATION = '15m'
module.exports.JWT_REFRESH_TOKEN_EXPIRATION_SECONDS = 1 * 24 * 60 * 60

module.exports.PET_STATUS = {
    available: 1,
    fostered: 2,
    adopted: 3
}

module.exports.PET_STATUS_ENUM = [1,2, 3]

module.exports.PET_TYPES = {
    cat: 1,
    dog: 2
}

module.exports.PET_TYPES_ENUM = [1, 2]
