const {
    response
} = require('express');
const axios = require('axios');


const path = process.env.GITHUB_PATH;
const token = process.env.PERSONAL_TOKEN;

let accountData = () => {
    return new Promise((resolve, reject) => {
        const url = `${path}users/alexsoria9519`;
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json" // MUST ADD TO INCLUDE TOPICS
            }
        }).then(response => {
            // console.log('response ', response.data);
            resolve(response.data);
        }).catch(err => {
            console.error('error ', err);
            reject(err);
        });
    });
}

const getAccountData = async (req, res = response) => {
    let account = await accountData();

    console.log('accountData ', account);

    res.status(200).json({
        msg: 'Github - Controller',
        account: account,
        ok: true
    });
}

module.exports = {
    getAccountData
}