const sendToken = (user, statusCode, res) => {

    const Token = user.getJwtToken();

    const option= {
        expires: new Date(Date.now() + process.env.COOKIES_EXPIRES_DATE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('Token', Token,  option).json({
        success: true,
        Token, 
        user
    });
}

module.exports = sendToken;