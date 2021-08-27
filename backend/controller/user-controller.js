import { response } from "express";
import user from "../model/user-Schema.js";
import history from "../model/user-history.js";
import log from "../model/log-schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import request from 'request';

export const signup = async (req, res) => {
    console.log("call hua");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        console.log("alll comp");
        return res.status(422).json({ error: " plx field all" });
    }
    try {
        const userExist = await user.findOne({ email: email });
        if (userExist) {
            console.log("email aa  gai  email wali")
            return res.status(422).json({ error: "email already  exist" });
        }
        const date = new Date().toLocaleString();
        console.log(date)
        const User = new user({ name, email, password });
        await User.save();
        console.log("done");
    } catch (err) {
        console.log("Eeeeeeeeeeee");
    }
}

export const login = async (req, res) => {
    console.log("login");
    console.log(req.body);
    try {
        console.log("2");
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "plz filled the dataa" })
        }
        console.log("4");
        const userLogin = await user.findOne({ email: email });
        console.log("ddd", userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            console.log("11111111111")
            const token = await userLogin.generateAuthToken();
            console.log(token)
            if (!isMatch) {
                res.status(400).json({ message: " Invlid Credientials " });
            } else {
                console.log("8");
                const date = new Date().toLocaleString();
                console.log(date)
                // const User = new user.update({date});
                const User = user.update({ email: userLogin.email }, { $set: { date: date } });
                console.log(User)
                console.log("date2")
                await User.update();
                const Log = new log({ email, date });
                await Log.save();
                res.json({ message: "user Signin Successfully", token: token, date: userLogin.date, email: userLogin.email });
            }
        } else {
            console.log("9");
            res.status(400).json({ error: "invlid Credientials" })
        }

    } catch (err) {
        console.log("10");
        console.log(err);
    }
}


export const weatherCity = async(req, res) => {
    console.log("weather app");
    console.log(req.query);
    const { city, email } = req.query
    console.log(city, email);
    try {
        console.log("try");
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a25864b6917859e23269883fe62334a8`;
        request(url, async (error, response, body) => {
            const data = JSON.parse(body)
            console.log(data);
            const weather = data.weather
            console.log(weather)
            res.status(200).json(data.weather)
            console.log("hhhhhhhhhhh");
            const date = new Date().toLocaleString();
            console.log(date)
            const History = new history({ email, city, date, weather });
            const a = await History.save();
            console.log("eeeeeeeeeee")
        })

    } catch (err) {
        console.log("err");
    }
}

export const current = async (req, res) => {
    console.log(req.query);
    const { lat, log } = req.query
    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=a25864b6917859e23269883fe62334a8`;
        request(url, (error, response, body) => {
            const data = JSON.parse(body)
            console.log("currte", data);
            res.status(200).json(data.weather)
        })
    } catch (err) {
        console.log("err");
    }
}

export const historyGet = async (req, res) => {
    console.log("history")
    const email = req.params.email;
    console.log(email)
    try {
        console.log("try")
        const data = await history.find({ email: email });
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.log("err")
    }
}